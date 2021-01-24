import { FC } from 'react'
import Head from 'next/head'
import Header from '../../components/sections/Header'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { PrismaClient } from '@prisma/client'
import { extendJobsData, capitalize } from '../../utils'
import { JobPreviewTile } from '../../components'

type Props = {
  jobs: Models.JobWithRelations[]
  location: string
  locationDescriptionMeta: string
  locationTitleMeta: string
}

const Locations: FC<Props> = ({
  jobs,
  location,
  locationDescriptionMeta,
  locationTitleMeta,
}) => {
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
          property="description"
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
            location === 'worldwide'
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
  const prisma = new PrismaClient()

  const locations = await prisma.location.findMany()

  const paths = locations.map(({ name }) => {
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
    where: { location: { name: { contains: params.name.replace('-', ' ') } } },
    include: { location: true, category: true, tags: true, company: true },
    orderBy: [{ featured: 'desc' }, { epoch: 'desc' }],
  })

  // getStaticProps Fails to Serialize Date Object
  const stringifiedData = JSON.stringify(rawData)
  const data = JSON.parse(stringifiedData)

  // Adds .daysSinceEpoch & .urlSlug
  const extendedJobsData = extendJobsData(data)

  await prisma.$disconnect()

  const location = params.name.replace('-', ' ')

  const locationTitleMeta =
    location === 'worldwide'
      ? `Worldwide Remote Jobs`
      : `${capitalize(location)} Remote Jobs`

  const locationDescriptionMeta =
    location === 'worldwide'
      ? `The latest Remote Job listings from companies across the world`
      : `The latest Remote Job listings from companies in ${location}`

  return {
    props: {
      jobs: extendedJobsData,
      location,
      locationTitleMeta,
      locationDescriptionMeta,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Locations
