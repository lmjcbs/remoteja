import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../utils'
import { JobPreviewTile } from '../components'

export default function Home({ jobs }) {
  return (
    <main>
      <div className="py-4 px-1 md:px-2">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          Showing All Remote Jobs
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

export const getStaticProps = async () => {
  const prisma = new PrismaClient()
  const rawData = await prisma.job.findMany({
    include: { location: true, category: true, tags: true },
    orderBy: [{ pinned: 'desc' }, { epoch: 'desc' }],
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
