import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../../utils'
import { JobPreviewTile } from '../../components'

export default function Categories({ jobs, category }) {
  return (
    <main>
      <div className="py-4 px-1 md:px-2">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          Remote {category} Jobs
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

  const categories = await prisma.category.findMany()

  const paths = categories.map(({ name }) => {
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
    where: { category: { name: { contains: params.name } } },
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
      category: params.name,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}