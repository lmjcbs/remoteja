import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import prisma from '../../lib/prisma'
import { capitalize, dateStripped, getUrlSlug } from '../../utils'
import Header from '../../components/sections/Header'
import { JobPreviewTile } from '../../components'
import { ParsedUrlQuery } from 'querystring'

type CategoriesProps = {
  jobs: Models.JobWithRelations[]
  category: string
}

const Categories = ({ jobs, category }: CategoriesProps) => {
  return (
    <main>
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
      <Header
        h1={`Remote ${category} Jobs`}
        h2={`Looking for remote ${category} jobs? View the lastest job listings from
          companies hiring for ${category} positions.`}
      />

      {jobs.map((job) => (
        <JobPreviewTile job={job} />
      ))}
    </main>
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

  const data = await prisma.job.findMany({
    select: {
      jid: true,
      applyCTA: true,
      createdEpoch: true,
      companyName: true,
      datePosted: true,
      descriptionAsHTML: true,
      featured: true,
      salaryCurrency: true,
      salaryMin: true,
      salaryMax: true,
      title: true,
      location: true,
      category: true,
      tags: true,
      type: true,
    },
    where: { category: { slug: { contains: params.name } } },
    orderBy: [{ featured: 'desc' }, { createdEpoch: 'desc' }],
  })

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
