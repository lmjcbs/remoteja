import { FC } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { extendJobsData, capitalize } from '../../utils'
import Header from '../../components/sections/Header'
import { JobPreviewTile } from '../../components'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  jobs: Models.JobWithRelations[]
  category: string
}

const Categories: FC<Props> = ({ jobs, category }) => {
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
          property="description"
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
  const prisma = new PrismaClient()

  const categories = await prisma.category.findMany()

  const paths = categories.map(({ name }) => {
    return {
      params: {
        name: name.replace(' ', '-'),
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

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params as Params
  const prisma = new PrismaClient()

  const rawData = await prisma.job.findMany({
    where: { category: { name: { contains: params.name.replace('-', ' ') } } },
    include: { location: true, category: true, tags: true },
    orderBy: [{ featured: 'desc' }, { epoch: 'desc' }],
  })

  // getStaticProps Fails to Serialize Date Object
  const stringifiedData = JSON.stringify(rawData)
  const data = JSON.parse(stringifiedData)

  // Adds .daysSinceEpoch & .urlSlug
  const extendedJobsData = extendJobsData(data)

  await prisma.$disconnect()

  return {
    props: {
      jobs: extendedJobsData,
      category: params.name.replace('-', ' '),
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Categories
