import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../../utils'
import { JobPreviewTile } from '../../components'
import { useRouter } from 'next/router'

export default function Categories({ jobs, tag }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <div className="py-4 px-1 md:px-2">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          Remote {tag} Jobs
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

  const tags = await prisma.tag.findMany()

  const paths = tags.map(({ name }) => {
    return {
      params: {
        name,
      },
    }
  })

  await prisma.$disconnect()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()

  const rawData = await prisma.job.findMany({
    where: { tags: { some: { name: { contains: params.name } } } },
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
      tag: params.name,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}
