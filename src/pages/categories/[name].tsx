import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../../utils'
import { JobPreviewTile } from '../../components'
import { ParsedUrlQuery } from 'querystring'

type CategoriesProps = {
  jobs: Models.JobWithRelations[]
  category: string
}

const Categories: FC<CategoriesProps> = ({ jobs, category }) => {
  return (
    <main className="py-4 px-1 md:px-2">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          Remote {category} Jobs
        </h2>
      </div>

      <div className="w-full">
        {jobs.map((job) => (
          <JobPreviewTile job={job} />
        ))}
      </div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient()

  const categories = await prisma.category.findMany()

  const paths = categories.map(({ name }) => {
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

export const getStaticProps: GetStaticProps<CategoriesProps, Params> = async (
  context
) => {
  const params = context.params as Params
  const prisma = new PrismaClient()

  const rawData = await prisma.job.findMany({
    where: { category: { name: { contains: params.name.replace('-', ' ') } } },
    include: { location: true, category: true, tags: true },
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
      category: params.name.replace('-', ' '),
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Categories
