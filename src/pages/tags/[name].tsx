import { FC } from 'react'
import Head from 'next/head'
import Header from '../../components/sections/Header'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { PrismaClient } from '@prisma/client'
import { extendJobsData, capitalize } from '../../utils'
import { JobPreviewTile } from '../../components'
import { useRouter } from 'next/router'

type Props = {
  jobs: Models.JobWithRelations[]
  tag: string
}

const Tags: FC<Props> = ({ jobs, tag }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading</div>
  }
  return (
    <main>
      <Head>
        <title>Remote {capitalize(tag)} Jobs | Remoteja</title>
        <meta
          property="title"
          key="title"
          content={`Remote ${capitalize(tag)} Jobs | Remoteja`}
        />
        <meta
          property="og:title"
          key="og:title"
          content={`Remote ${capitalize(tag)} Jobs | Remoteja`}
        />
        <meta
          property="description"
          key="description"
          content={`The lastest remote ${tag} jobs from companies across the world.`}
        />
        <meta
          property="og:description"
          key="og:description"
          content={`The lastest remote ${tag} jobs from companies across the world.`}
        />
      </Head>
      <Header
        h1={`Remote ${capitalize(tag)} Jobs`}
        h2={`Looking for remote ${tag} jobs? View the lastest job listings from
          companies hiring for ${tag} positions.`}
      />
      {jobs.map((job) => (
        <JobPreviewTile job={job} />
      ))}
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient()

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

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params as Params
  const prisma = new PrismaClient()

  const rawData = await prisma.job.findMany({
    where: { tags: { some: { slug: { contains: params.name } } } },
    include: { location: true, category: true, tags: true, type: true },
    orderBy: [{ featured: 'desc' }, { createdEpoch: 'desc' }],
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
      tag: params.name,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Tags
