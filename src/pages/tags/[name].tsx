import Head from 'next/head'
import Header from '../../components/sections/Header'
import prisma from '../../lib/prisma'
import { dateStripped, getUrlSlug } from '../../utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import NavBar from '../../components/sections/NavBar'
import React from 'react'
import Footer from '../../components/sections/Footer'
import JobCardContainer from '../../components/sections/JobCardContainer'
import { ONE_WEEK_EPOCH } from '../../lib/constants'

type TagProps = {
  jobs: JobWithRelations[]
  tag: string
  slug: string
}

const Tags = ({ jobs, tag, slug }: TagProps) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Remote {tag} Jobs | Remoteja</title>
        <meta
          key="title"
          name="title"
          content={`Remote ${tag} Jobs | Remoteja`}
        />
        <meta
          key="description"
          name="description"
          content={`Looking for remote ${tag} jobs? View the lastest job listings from
          companies hiring for ${tag} positions.`}
        />

        {/* Open Graph / Facebook */}
        <meta key="og:type" property="og:type" content="website" />
        <meta
          key="og:url"
          property="og:url"
          content={`https://remoteja.com/tags/${slug}`}
        />
        <meta
          key="og:title"
          property="og:title"
          content={`Remote ${tag} Jobs | Remoteja`}
        />
        <meta
          key="og:description"
          property="og:description"
          content={`Looking for remote ${tag} jobs? View the lastest job listings from
          companies hiring for ${tag} positions.`}
        />
        <meta
          key="og:image"
          property="og:image"
          content={`https://i.ibb.co/FsYTW2Z/remoteja1200x628.png`}
        />

        {/* Twitter */}
        <meta key="twitter:site" name="twitter:site" content="@remoteja" />
        <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta
          key="twitter:image:alt"
          name="twitter:image:alt"
          content="Remoteja logo"
        />
      </Head>
      <NavBar />
      <Header h1={`Remote ${tag} Jobs`} h2={``} />
      <JobCardContainer jobs={jobs} />
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await prisma.tag.findMany()

  const paths = tags.map(({ slug }) => {
    return {
      params: {
        name: slug,
      },
    }
  })

  await prisma.$disconnect()

  return {
    paths,
    fallback: true,
  }
}

interface Params extends ParsedUrlQuery {
  name: string
}

export const getStaticProps: GetStaticProps<TagProps, Params> = async (
  context
) => {
  const params: Params = context.params as Params

  const tag = await prisma.tag.findUnique({
    where: { slug: params.name },
  })

  if (!tag) return { notFound: true }

  const featured = await prisma.job.findMany({
    where: {
      AND: [
        { tags: { some: { slug: { contains: params.name } } } },
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
    orderBy: [{ featured: 'desc' }, { createdEpoch: 'desc' }],
  })

  const standard = await prisma.job.findMany({
    where: {
      AND: [
        { tags: { some: { slug: { contains: params.name } } } },
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
    orderBy: [{ featured: 'desc' }, { createdEpoch: 'desc' }],
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
      tag: tag.name,
      slug: tag.slug,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Tags
