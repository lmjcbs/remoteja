import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { PrismaClient } from '@prisma/client'
import { extendJobsData } from '../../utils'
import { JobPreviewTile } from '../../components'

type LocationsProps = {
  jobs: Models.JobWithRelations[]
  location: string
}

const Locations: FC<LocationsProps> = ({ jobs, location }) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient()

  const locations = await prisma.location.findMany()

  const paths = locations.map(({ name }) => {
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

export const getStaticProps: GetStaticProps<LocationsProps, Params> = async (
  context
) => {
  const params = context.params as Params
  const prisma = new PrismaClient()

  const rawData = await prisma.job.findMany({
    where: { location: { name: { contains: params.name.replace('-', ' ') } } },
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
      location: params.name.replace('-', ' '),
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Locations
