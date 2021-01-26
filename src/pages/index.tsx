import { FC } from 'react'
import Head from 'next/head'
import Header from '../components/sections/Header'
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../utils'
import { JobPreviewTile } from '../components'

type Props = {
  jobs: Models.JobWithRelations[]
}

const Home: FC<Props> = ({ jobs }) => {
  return (
    <main>
      <Head>
        <meta property="og:url" content="https://remoteja.com/" />
        <meta property="og:site_name" content="Remoteja" />
      </Head>
      <Header
        h1="The Latest Remote Jobs"
        h2="Browse thousands of jobs in Programming, Design, Sales and more from the companies hiring global talent."
      />
      {jobs.map((job) => (
        <JobPreviewTile job={job} />
      ))}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const rawData = await prisma.job.findMany({
    include: {
      location: true,
      category: true,
      tags: true,
      company: true,
      type: true,
    },
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
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Home
