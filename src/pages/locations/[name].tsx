import Head from 'next/head'
import Header from '../../components/sections/Header'
import prisma from '../../lib/prisma'
import { dateStripped, getUrlSlug } from '../../utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import Footer from '../../components/sections/Footer'
import JobCardContainer from '../../components/sections/JobCardContainer'
import NavBar from '../../components/sections/NavBar'
import { ONE_WEEK_EPOCH } from '../../lib/constants'

type LocationProps = {
  jobs: JobWithRelations[]
  location: string
  slug: string
  locationDescriptionMeta: string
  locationTitleMeta: string
}

const Locations = ({
  jobs,
  location,
  slug,
  locationDescriptionMeta,
  locationTitleMeta,
}: LocationProps) => {
  return (
    <>
      <Head>
        <title>{locationTitleMeta} | Remoteja</title>
        <meta
          key="title"
          name="title"
          content={`${locationTitleMeta} | Remoteja`}
        />
        <meta
          key="description"
          name="description"
          content={`Looking for remote jobs
          ${
            location === 'Worldwide'
              ? ' without any geographic restrictions'
              : ` available to applicants in ${location}`
          }? View ${locationDescriptionMeta}.`}
        />

        {/* Open Graph / Facebook */}
        <meta key="og:type" property="og:type" content="website" />
        <meta
          key="og:url"
          property="og:url"
          content={`https://remoteja.com/locations/${slug}`}
        />
        <meta
          key="og:title"
          property="og:title"
          content={`${locationTitleMeta} | Remoteja`}
        />
        <meta
          key="og:description"
          property="og:description"
          content={`Looking for remote jobs
          ${
            location === 'Worldwide'
              ? ' without any geographic restrictions'
              : ` available to applicants in ${location}`
          }? View ${locationDescriptionMeta}.`}
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
      <Header
        h1={locationTitleMeta}
        h2={`Looking for remote jobs
          ${
            location === 'Worldwide'
              ? ' without any geographic restrictions'
              : ` available to applicants in ${location}`
          }? View ${locationDescriptionMeta}.`}
      ></Header>
      <JobCardContainer jobs={jobs} />
      <Footer />
    </>
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

  const featured = await prisma.job.findMany({
    where: {
      AND: [
        { location: { slug: { contains: params.name } } },
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
        { location: { slug: { contains: params.name } } },
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

  const locationTitleMeta =
    location.name === 'Worldwide'
      ? `Worldwide Remote Jobs`
      : `Remote Jobs in ${location.name} `

  const locationDescriptionMeta =
    location.name === 'Worldwide'
      ? `The latest Remote Job listings from companies across the world`
      : `The latest Remote Job listings from companies in ${location.name}`

  await prisma.$disconnect()

  return {
    props: {
      jobs: jobs,
      location: location.name,
      slug: location.slug,
      locationTitleMeta,
      locationDescriptionMeta,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Locations
