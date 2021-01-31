import Head from 'next/head'
import Header from '../../components/sections/Header'
import prisma from '../../lib/prisma'
import { dateStripped, getUrlSlug } from '../../utils'
import { JobPreviewTile } from '../../components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

type TagProps = {
  jobs: JobWithRelations[]
  tag: string
}

const Tags = ({ jobs, tag }: TagProps) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <Head>
        <title>Remote {tag} Jobs | Remoteja</title>
        <meta
          property="title"
          key="title"
          content={`Remote ${tag} Jobs | Remoteja`}
        />
        <meta
          property="og:title"
          key="og:title"
          content={`Remote ${tag} Jobs | Remoteja`}
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
        h1={`Remote ${tag} Jobs`}
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
  const tags = await prisma.tag.findMany()

  const paths = tags.map(({ slug }) => {
    return {
      params: {
        name: slug,
      },
    }
  })

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
    rejectOnNotFound: true,
  })

  if (!tag) return { notFound: true }

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
    where: { tags: { some: { slug: { contains: params.name } } } },
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

  await prisma.$disconnect

  return {
    props: {
      jobs: jobs,
      tag: tag.name,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Tags
