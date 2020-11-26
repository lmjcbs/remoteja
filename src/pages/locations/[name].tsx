import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../../utils'
import { JobPreviewTile } from '../../components'

export default function Categories({ jobs, location }) {
  return (
    <main>
      <div className="py-4 px-1 md:px-2">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {location === 'worldwide'
            ? `${location} Remote Jobs`
            : `Remote Jobs in ${location}`}
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

export const getStaticPaths = async () => {
  const prisma = new PrismaClient()

  const locations = await prisma.location.findMany()

  const paths = locations.map(({ name }) => {
    return {
      params: {
        name,
      },
    }
  })

  await prisma.$disconnect()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()

  const rawData = await prisma.job.findMany({
    where: { location: { name: { contains: params.name } } },
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
      location: params.name,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}
