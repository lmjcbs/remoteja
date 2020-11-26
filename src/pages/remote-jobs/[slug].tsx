import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { getUrlSlug, serializeDateObjects, extendJobsData } from '../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { JobPreviewTile } from '../../components'

export default function JobPage({ job, relatedJobs }) {
  return (
    <main>
      <div className="flex flex-row justify-between">
        <div>
          <FontAwesomeIcon
            className="mx-2"
            icon={faArrowLeft}
          ></FontAwesomeIcon>
          <Link href="/">
            <a>Back To All Remote Jobs</a>
          </Link>
        </div>
        <div>
          <Link href={`/categories/${job.category.name}`}>
            <a className="capitalize">
              View More {job.category.name} Remote Jobs
            </a>
          </Link>
          <FontAwesomeIcon
            className="mx-2"
            icon={faArrowRight}
          ></FontAwesomeIcon>
        </div>
      </div>

      <div className="pt-10">
        <h2 className="font-medium text-gray-600">{job.companyName}</h2>
      </div>

      <div className="pt-2">
        <h1 className="font-bold text-2xl text-gray-800">{job.title}</h1>
      </div>

      <div className="py-3">
        {job.tags.map(({ name, id }) => (
          <Link key={id} href={`/tags/${name}`}>
            <a className="inline-block bg-indigo-300 hover:bg-indigo-400 border-2 hover:border-indigo-400 border-indigo-300 rounded-md px-1 md:px-2 py-0 text-sm md:font-medium text-gray-700 mr-1 mb-1 shadow-md tracking-wide">
              <span className="font-bold">#</span>
              {name}
            </a>
          </Link>
        ))}
      </div>

      <div className="flex flex-row items-center mb-6">
        <FontAwesomeIcon
          className="mx-1 text-indigo-500"
          icon={faMapMarkerAlt}
        ></FontAwesomeIcon>
        <p className="capitalize">{job.location.name}</p>
      </div>

      <div>
        <p>{job.description}</p>
      </div>

      <div className="flex flex-row justify-between my-6">
        <Link href={`${job.applyUrl}?ref=remoteja.com`}>
          <a target="_blank" rel="noopener">
            <div className="px-2 py-1 bg-indigo-500 rounded-md text-white font-semibold hover:bg-indigo-600 shadow-lg">
              Apply For This Position
            </div>
          </a>
        </Link>
      </div>

      <div className="w-1/2 mt-12">
        <h4 className="text-xl font-semibold text-gray-700">Related Jobs</h4>
        <div className="w full">
          {relatedJobs.map((job) => (
            <JobPreviewTile job={job}></JobPreviewTile>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function getStaticPaths() {
  const prisma = new PrismaClient()

  const jobs = await prisma.job.findMany()

  const paths = jobs.map((job) => {
    return {
      params: {
        slug: getUrlSlug(job),
      },
    }
  })

  await prisma.$disconnect()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient()

  // jid Located at End of Url Slug
  const jid = params.slug.split('-').pop()

  const rawData = await prisma.job.findUnique({
    where: {
      jid,
    },
    include: { location: true, category: true, tags: true },
  })

  // related jobs preview
  const rawRelatedJobs = await prisma.job.findMany({
    where: {
      categoryId: rawData.categoryId,
    },
    include: { location: true, category: true, tags: true },
    take: 4,
  })

  // getStaticProps Fails to Serialize Date Object
  const jobsData = serializeDateObjects(rawData)
  const relatedJobs = serializeDateObjects(rawRelatedJobs)

  await prisma.$disconnect()

  return {
    props: {
      job: jobsData,
      // Adds .daysSinceEpoch property to job
      relatedJobs: extendJobsData(relatedJobs),
    },
  }
}
