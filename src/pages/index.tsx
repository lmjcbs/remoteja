import { FC } from 'react'
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../utils'
import { JobPreviewTile } from '../components'

type HomeProps = {
  jobs: Models.JobWithRelations[]
}

const Home: FC<HomeProps> = ({ jobs }) => {
  return (
    <main>
      <div className="w-full py-4 px-1 md:px-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 capitalize">
          Showing The Latest Remote Jobs
        </h2>
      </div>

      <div>
        {jobs.map((job) => (
          <JobPreviewTile job={job} />
        ))}
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const rawData = await prisma.job.findMany({
    include: { location: true, category: true, tags: true, company: true },
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
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Home
