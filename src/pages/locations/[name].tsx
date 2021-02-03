import Head from 'next/head'
import Header from '../../components/sections/Header'
import prisma from '../../lib/prisma'
import { dateStripped, getUrlSlug } from '../../utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { JobPreviewTile } from '../../components'
import { ParsedUrlQuery } from 'querystring'

type LocationProps = {
  jobs: JobWithRelations[]
  location: string
  locationDescriptionMeta: string
  locationTitleMeta: string
}

const Locations = ({
  jobs,
  location,
  locationDescriptionMeta,
  locationTitleMeta,
}: LocationProps) => {
  return (
    <main>
      <Head>
        <title>{locationTitleMeta} | Remoteja</title>
        <meta
          property="title"
          key="title"
          content={`${locationTitleMeta} | Remoteja`}
        />
        <meta
          property="og:title"
          key="og:title"
          content={`${locationTitleMeta} | Remoteja`}
        />
        <meta
          name="description"
          key="description"
          content={`${locationDescriptionMeta}`}
        />
        <meta
          property="og:description"
          key="og:description"
          content={`${locationDescriptionMeta}`}
        />
      </Head>
      <Header
        h1={locationTitleMeta}
        h2={`Looking for remote jobs
          ${
            location === 'Worldwide'
              ? ' without any geographic restrictions'
              : ` available to applicants in ${location}`
          }
          ? View ${locationDescriptionMeta}.`}
      ></Header>

      {jobs.map((job) => (
        <JobPreviewTile job={job} />
      ))}
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locations = await prisma.location.findMany()

  const paths = locations.map(({ slug }) => {
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

export const getStaticProps: GetStaticProps<LocationProps, Params> = async (
  context
) => {
  const params = context.params as Params

  const location = await prisma.location.findUnique({
    where: { slug: params.name },
  })

  if (!location) return { notFound: true }

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
    where: { location: { slug: { contains: params.name } } },
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

  const locationTitleMeta =
    location.name === 'Worldwide'
      ? `Worldwide Remote Jobs`
      : `Remote Jobs in ${location.name} `

  const locationDescriptionMeta =
    location.name === 'Worldwide'
      ? `The latest Remote Job listings from companies across the world`
      : `The latest Remote Job listings from companies in ${location.name}`

  await prisma.$disconnect

  return {
    props: {
      jobs: jobs,
      location: location.name,
      locationTitleMeta,
      locationDescriptionMeta,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Locations
