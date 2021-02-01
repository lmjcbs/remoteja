import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { JobPreviewTile } from '../../components'
import TagLink from '../../components/ui/TagLink'
import {
  getUrlSlug,
  getJobTwitterShareLink,
  getJobMailtoLink,
  dateStripped,
} from '../../utils'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailtoIcon,
  MapMarkerIcon,
  TwitterIcon,
  ContractIcon,
  SalaryIcon,
} from '../../lib/svg'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import prisma from '../../lib/prisma'

type JobsProps = {
  job: Models.JobWithRelations
  relatedJobs: Models.JobWithRelations[]
  twitterShareLink: string
}

const Job: FC<JobsProps> = ({ job, relatedJobs, twitterShareLink }) => {
  const router = useRouter()

  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  let formatter

  switch (job?.salaryCurrency) {
    case 'GBP':
      formatter = Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
      })
      break

    case 'EUR':
      formatter = Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
      })
      break

    case 'USD':
      formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      })
      break

    case 'CAD':
      formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 0,
      })
      break

    default:
      formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      })
      break
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Box as="main">
      <Head>
        <title>Remote {job.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex direction="row" justify="space-between" fontWeight="semibold">
        <Link href="/" scroll={false}>
          <Flex direction="row" align="center" cursor="pointer">
            <ArrowLeftIcon size={6} color="gray.700" />
            <Text as="a" ml={1}>
              All Remote Jobs
            </Text>
          </Flex>
        </Link>
        <Link href={`/categories/${job.category.name}`}>
          <Flex direction="row" align="center" cursor="pointer">
            <Text as="a" mr={1} textTransform="capitalize">
              More {job.category.name} Jobs
            </Text>
            <ArrowRightIcon size={6} color="gray.700" />
          </Flex>
        </Link>
      </Flex>

      <Flex direction="row" justify="space-between" mt={10}>
        <Flex direction="column">
          <Text fontWeight="medium" fontSize={['sm']} color="gray.600" my={1}>
            Posted <time dateTime={`${job.createdAt}`}>{job.datePosted}</time>
          </Text>
          <Heading
            id="company"
            as="h2"
            fontSize={['xl', 'xl', '2xl', '2xl']}
            color="gray.600"
            fontWeight="semibold"
          >
            {job.companyName}
          </Heading>
          <Heading
            id="title"
            as="h1"
            fontSize={['2xl', '2xl', '3xl', '3xl']}
            textTransform="capitalize"
            mt={1}
          >
            {job.title}
          </Heading>
          <Flex wrap="wrap" my={3}>
            {job.tags.map(({ name, slug }) => (
              <TagLink id={name} tag={name} slug={slug} />
            ))}
          </Flex>

          <Flex
            direction="column"
            textTransform="capitalize"
            fontWeight="semibold"
            mt={1}
          >
            <Box>
              <MapMarkerIcon size={5} color="gray.600" />
              <Link href={`/locations/${job.location.name.replace(' ', '-')}`}>
                <Text
                  as="a"
                  ml={1}
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                >
                  {job.location.name}
                </Text>
              </Link>
            </Box>
            <Flex mt={1} align="center">
              <ContractIcon size={5} />
              <Text ml={1}>{job.type.name}</Text>
            </Flex>
            {job.salaryCurrency !== undefined &&
            job.salaryCurrency !== null &&
            job.salaryMin !== undefined &&
            job.salaryMin !== null &&
            job.salaryMax !== undefined &&
            job.salaryMax !== null ? (
              <Flex align="center" mt={1}>
                <SalaryIcon size={5} />
                <Text ml={1}>
                  <Text as="span" fontWeight="medium" ml={1}>
                    {`${formatter.format(job.salaryMin)} - ${formatter.format(
                      job.salaryMax
                    )}`}
                  </Text>
                </Text>
              </Flex>
            ) : null}
          </Flex>
        </Flex>
      </Flex>

      <Box className="border-b-2 py-2" />

      <Heading id="about" as="h3" fontSize={['xl', 'xl', '2xl', '2xl']} my={4}>
        About the Role
      </Heading>

      <Box
        id="description"
        dangerouslySetInnerHTML={{ __html: job.descriptionAsHTML }}
      />

      <Flex direction="row" align="center" justify="space-between">
        <Text
          px={2}
          py={1}
          mt={8}
          color="white"
          rounded="md"
          fontWeight="semibold"
          boxShadow="lg"
          className="bg-indigo-500 hover:bg-indigo-600"
        >
          {emailRegEx.test(job.applyCTA) ? (
            <Link
              href={`mailto:${job.applyCTA}?subject=Application%20for%20${job.title}%20at%20${job.companyName}%20via%20remoteja.com`}
            >
              <a target="_blank" rel="noopener">
                Apply For This Position
              </a>
            </Link>
          ) : (
            <Link href={`${job.applyCTA}?ref=remoteja.com`}>
              <a target="_blank" rel="noopener">
                Apply For This Position
              </a>
            </Link>
          )}
        </Text>

        <Flex direction="row" items="center" p={1} mt={8}>
          <Text fontWeight="semibold" mx={1}>
            Share
          </Text>
          <Box mx={1}>
            <Link href={getJobMailtoLink(job)}>
              <a rel="noopener">
                <MailtoIcon size={6} />
              </a>
            </Link>
          </Box>

          <Box mx={1}>
            <Link href={twitterShareLink}>
              <a target="_blank" rel="noopener">
                <TwitterIcon size={6} />
              </a>
            </Link>
          </Box>
        </Flex>
      </Flex>

      {relatedJobs.length > 0 ? (
        <div className="mt-12">
          <h4 className="text-xl font-semibold text-gray-700">Similar Jobs</h4>
          <div>
            {relatedJobs.map((job) => (
              <JobPreviewTile job={job}></JobPreviewTile>
            ))}
          </div>
        </div>
      ) : null}
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await prisma.job.findMany({
    include: { location: true, category: true, tags: true, type: true },
  })

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

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params

  // jid Located at End of Url Slug
  const jid = params.slug.split('-').pop()

  const job = await prisma.job.findUnique({
    where: {
      jid,
    },
    include: { location: true, category: true, tags: true, type: true },
  })

  if (!job) return { notFound: true }

  // related jobs preview
  const relatedData = await prisma.job.findMany({
    where: {
      categoryId: job.categoryId,
      jid: {
        not: jid,
      },
    },
    orderBy: [{ featured: 'desc' }, { createdEpoch: 'desc' }],
    include: { location: true, category: true, tags: true, type: true },
    take: 3,
  })

  const relatedJobs = relatedData.map((job) => {
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
      job: dateStripped(job),
      relatedJobs: relatedJobs,
      twitterShareLink: getJobTwitterShareLink(job),
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Job
