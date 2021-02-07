import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import prisma from '../../lib/prisma'
import { capitalize, dateStripped, getUrlSlug } from '../../utils'
import Header from '../../components/sections/Header'
import { ParsedUrlQuery } from 'querystring'
import Footer from '../../components/sections/Footer'
import JobCardContainer from '../../components/sections/JobCardContainer'
import NavBar from '../../components/sections/NavBar'
import { ONE_WEEK_EPOCH } from '../../lib/constants'

type CategoriesProps = {
  jobs: JobWithRelations[]
  category: string
}

const Categories = ({ jobs, category }: CategoriesProps) => {
  return (
    <>
      <Head>
        <title>Remote {capitalize(category)} Jobs | Remoteja</title>
        <meta
          property="title"
          key="title"
          content={`Remote ${capitalize(category)} Jobs | Remoteja`}
        />
        <meta
          property="og:title"
          key="og:title"
          content={`Remote ${capitalize(category)} Jobs | Remoteja`}
        />
        <meta
          name="description"
          key="description"
          content={`The lastest remote ${category} jobs from companies across the world.`}
        />
        <meta
          property="og:description"
          key="og:description"
          content={`The lastest remote ${category} jobs from companies across the world.`}
        />
      </Head>
      <NavBar />
      <Header
        h1={`Remote ${capitalize(category)} Jobs`}
        h2={`Looking for remote ${category} jobs? View the lastest job listings from
          companies hiring for ${category} positions.`}
      />
      <JobCardContainer jobs={jobs} />
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await prisma.category.findMany()

  const paths = categories.map(({ slug }) => {
    return {
      params: {
        name: slug,
      },
    }
  })

  await prisma.$disconnect()

  return {
    paths,
    fallback: false,
  }
}

interface Params extends ParsedUrlQuery {
  name: string
}

export const getStaticProps: GetStaticProps<CategoriesProps, Params> = async (
  context
) => {
  const params = context.params as Params

  const category = await prisma.category.findUnique({
    where: { slug: params.name },
  })

  if (!category) return { notFound: true }

  const featured = await prisma.job.findMany({
    where: {
      AND: [
        { category: { slug: { contains: params.name } } },
        {
          AND: [
            {
              createdEpoch: {
                gt: Math.round(Date.now() / 1000) - ONE_WEEK_EPOCH,
              },
            },
            {
              featured: {
                equals: true,
              },
            },
          ],
        },
      ],
    },
    include: {
      location: true,
      category: true,
      tags: true,
      company: true,
      type: true,
    },
    orderBy: { createdEpoch: 'desc' },
  })

  const standard = await prisma.job.findMany({
    where: {
      AND: [
        { category: { slug: { contains: params.name } } },
        {
          NOT: {
            AND: [
              {
                createdEpoch: {
                  gt: Math.round(Date.now() / 1000) - ONE_WEEK_EPOCH,
                },
              },
              {
                featured: {
                  equals: true,
                },
              },
            ],
          },
        },
      ],
    },
    include: {
      location: true,
      category: true,
      tags: true,
      company: true,
      type: true,
    },
    orderBy: { createdEpoch: 'desc' },
  })

  const data = [...featured, ...standard]

  const jobs = data.map((job) => {
    return dateStripped({
      ...job,
      daysSinceEpoch: Math.floor(
        (Math.round(Date.now() / 1000) - job.createdEpoch) / 86400
      ),
      urlSlug: getUrlSlug(job),
    }) as JobWithRelations
  })

  await prisma.$disconnect()

  return {
    props: {
      jobs: jobs,
      category: params.name,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Categories
