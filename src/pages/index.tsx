import Head from 'next/head'
import Header from '../components/sections/Header'
import { GetStaticProps } from 'next'
import prisma from '../lib/prisma'
import { dateStripped, getUrlSlug } from '../utils'
import { JobPreviewTile } from '../components'

type HomeProps = {
  jobs: JobWithRelations[]
}

const Home = ({ jobs }: HomeProps) => {
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
  const data = await prisma.job.findMany({
    include: {
      location: true,
      category: true,
      tags: true,
      company: true,
      type: true,
    },
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
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Home
