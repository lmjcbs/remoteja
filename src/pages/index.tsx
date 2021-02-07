import Head from 'next/head'
import Header from '../components/sections/Header'
import { GetStaticProps } from 'next'
import prisma from '../lib/prisma'
import { dateStripped, getUrlSlug } from '../utils'
import NavBar from '../components/sections/NavBar'
import Footer from '../components/sections/Footer'
import JobCardContainer from '../components/sections/JobCardContainer'
import { ONE_WEEK_EPOCH } from '../lib/constants'

type HomeProps = {
  jobs: JobWithRelations[]
}

const Home = ({ jobs }: HomeProps) => {
  return (
    <>
      <Head>
        <title>
          Remoteja | Remote Jobs in Programming, Marketing, Design and more
        </title>
        <meta
          property="title"
          key="title"
          content="Remoteja | Remote Jobs in Programming, Marketing, Design and more"
        />
        <meta
          name="description"
          key="description"
          content="Say yes to remote working and start hiring the best talent from all corners of the world today. Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more."
        />
        <meta property="og:url" content="https://remoteja.com/" />
        <meta
          property="og:title"
          key="og:title"
          content="Remoteja | Remote Jobs in Programming, Sales, Marketing, Design and more"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Say yes to remote working and start hiring the best talent from all corners of the world today. Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@remoteja" />
      </Head>
      <NavBar />
      <Header
        h1="The Latest Remote Jobs"
        h2="Browse thousands of jobs in Programming, Design, Sales and more from the companies hiring global talent."
      />
      <JobCardContainer jobs={jobs} />
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featured = await prisma.job.findMany({
    where: {
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
    include: {
      location: true,
      category: true,
      tags: true,
      company: true,
      type: true,
    },
    orderBy: [{ createdEpoch: 'desc' }],
  })

  const standard = await prisma.job.findMany({
    where: {
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
    include: {
      location: true,
      category: true,
      tags: true,
      company: true,
      type: true,
    },
    orderBy: { createdEpoch: 'desc' },
  })

  // Orders all job postings by data posted.
  // Priority - Job postings that are featured and less than week old.
  // Low Priorirty - Standard Job postings and featured that are over a week old.
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
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Home
