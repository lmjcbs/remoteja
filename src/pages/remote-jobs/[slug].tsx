import Link from 'next/link'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
import { JobPreviewTile } from '../../components'
import {
  getUrlSlug,
  serializeDateObjects,
  extendJobsData,
  getJobTwitterShareLink,
  numberWithCommas,
} from '../../utils'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailtoIcon,
  MapMarkerIcon,
  TwitterIcon,
} from '../../lib/svg'

export default function JobPage({ job, relatedJobs }) {
  const router = useRouter()

  const twitterShareLink = getJobTwitterShareLink(job)

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <main className="px-1 md:px-2 lg:px-4">
      <div className="flex flex-row justify-between mt-6">
        <Link href="/">
          <div className="flex flex-row items-center space-x-2 cursor-pointer">
            <ArrowLeftIcon />
            <a className="text-base font-medium">All Remote Jobs</a>
          </div>
        </Link>

        <Link href={`/categories/${job.category.name}`}>
          <div className="flex flex-row items-center space-x-2 cursor-pointer">
            <a className="capitalize text-base font-medium">
              More Remote {job.category.name} Jobs
            </a>
            <ArrowRightIcon />
          </div>
        </Link>
      </div>

      <div className="pt-10">
        <h2 className="md:text-lg lg:text-xl font-semibold text-gray-600">
          {job.companyName}
        </h2>
      </div>

      <div className="pt-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          {job.title}
        </h1>
      </div>

      <div className="mt-2 space-x-1 lg:space-x-2">
        {job.tags.map(({ name, id }) => (
          <Link key={id} href={`/tags/${name}`}>
            <a className="inline-block bg-indigo-200 hover:bg-indigo-300 border-2 hover:border-indigo-300 border-indigo-200 rounded-md px-1 md:px-2 py-0 text-sm font-medium text-gray-700 shadow-md tracking-wide">
              <span className="font-bold">#</span>
              {name}
            </a>
          </Link>
        ))}
      </div>

      <div className="flex flex-row items-center space-x-1 my-3">
        <MapMarkerIcon />
        <Link href={`/locations/${job.location.name}`}>
          <a className="text-base capitalize font-medium text-gray-800 hover:underline">
            {job.location.name}
          </a>
        </Link>

        <div className="mx-1 text-base">·</div>
        <Link href={`/categories/${job.category.name}`}>
          <a className="text-base capitalize font-medium text-gray-800 hover:underline">
            {job.category.name}
          </a>
        </Link>
      </div>

      <div className="mb-4 ml-1">
        <p className="font-medium text-gray-800">
          {job?.salaryCurrency}
          {numberWithCommas(job?.salaryMin)}
          {!!job.salaryMin ? ' - ' : null}
          {numberWithCommas(job?.salaryMax)}
        </p>
      </div>

      <h3 className="font-semibold text-xl mb-2 mt-6">About the Role</h3>

      <div
        className="space-y-3 text-base lg:space-y-4 text-gray-800"
        dangerouslySetInnerHTML={{ __html: job.description }}
      ></div>

      <div className="flex flex-row items-center justify-between my-6">
        <Link href={`${job.applyUrl}?ref=remoteja.com`}>
          <a target="_blank" rel="noopener">
            <div className="px-2 py-1 bg-indigo-500 rounded-md text-white font-semibold hover:bg-indigo-600 shadow-lg">
              Apply For This Position
            </div>
          </a>
        </Link>
        <div className="flex flex-row items-center space-x-2 mr-4 lg:mr-8">
          <p className="block text-base lg:text-lg font-semibold text-gray-700">
            Share
          </p>
          <div className="flex flex-row space-x-2 w-full m-auto">
            <Link href="mailto:">
              <MailtoIcon />
            </Link>
            <Link href={twitterShareLink}>
              <a target="_blank" rel="noopener">
                <TwitterIcon />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full mt-12">
        <h4 className="text-xl font-semibold text-gray-700">Similar Jobs</h4>
        <div>
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
    fallback: true,
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
    orderBy: [{ pinned: 'desc' }, { epoch: 'desc' }],
    include: { location: true, category: true, tags: true },
    take: 3,
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
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}
