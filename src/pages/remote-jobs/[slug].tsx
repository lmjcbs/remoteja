import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
import { JobPreviewTile } from '../../components'
import TagLink from '../../components/ui/TagLink'
import {
  getUrlSlug,
  serializeDateObjects,
  extendJobsData,
  getJobTwitterShareLink,
  getJobMailtoLink,
} from '../../utils'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailtoIcon,
  MapMarkerIcon,
  TwitterIcon,
} from '../../lib/svg'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

type JobsProps = {
  job: Models.JobWithRelations
  relatedJobs: Models.JobWithRelations[]
  twitterShareLink: string
}

const Job: FC<JobsProps> = ({ job, relatedJobs, twitterShareLink }) => {
  const router = useRouter()

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
      <Flex
        direction="row"
        justify="space-between"
        mt={6}
        fontWeight="semibold"
      >
        <Link href="/">
          <Flex direction="row" align="center" cursor="pointer">
            <ArrowLeftIcon size={6} color="gray.700" />
            <Text as="a" ml={1}>
              All Jobs
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
            {job.tags.map(({ name }) => (
              <TagLink id={name} tag={name} />
            ))}
          </Flex>

          <Flex
            align="center"
            textTransform="capitalize"
            fontWeight="semibold"
            mt={2}
          >
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
            <Text as="span" mx={1} fontWeight="extrabold">
              ·
            </Text>
            <Link href={`/categories/${job.category.name.replace(' ', '-')}`}>
              <Text
                as="a"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
              >
                {job.category.name}
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>

      {/* Check for Salary */}

      <Box className="border-b-2 py-2" />

      <Heading id="about" as="h3" fontSize={['xl', 'xl', '2xl', '2xl']} my={4}>
        About the Role
      </Heading>

      <Box
        id="description"
        dangerouslySetInnerHTML={{ __html: job.descriptionAsHTML }}
      />

      <Flex direction="row" align="center" justify="space-between">
        <Link href={`${job.applyUrl}?ref=remoteja.com`}>
          <Text
            as="a"
            target="_blank"
            rel="noopener"
            px={2}
            py={1}
            mt={8}
            color="white"
            rounded="md"
            fontWeight="semibold"
            boxShadow="lg"
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            Apply For This Position
          </Text>
        </Link>
        <Flex direction="row" items="center" p={1} mt={8}>
          <Text fontWeight="semibold" mx={1}>
            Share
          </Text>
          <Link href={getJobMailtoLink(job)}>
            <Text as="a" rel="noopener" mx={1}>
              <MailtoIcon size={6} />
            </Text>
          </Link>
          <Link href={twitterShareLink}>
            <Text as="a" target="_blank" rel="noopener" mx={1}>
              <TwitterIcon size={6} />
            </Text>
          </Link>
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
  const prisma = new PrismaClient()

  const jobs = await prisma.job.findMany({
    include: { location: true, category: true, tags: true },
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
  const prisma = new PrismaClient()

  // jid Located at End of Url Slug
  const jid = params.slug.split('-').pop()

  const rawData = await prisma.job.findUnique({
    where: {
      jid,
    },
    include: { location: true, category: true, tags: true },
  })

  if (rawData === null) {
    await prisma.$disconnect()

    return {
      props: {
        job: null,
        relatedJobs: null,
      },
      revalidate: 1,
    }
  }

  // related jobs preview
  const rawRelatedJobs = await prisma.job.findMany({
    where: {
      categoryId: rawData.categoryId,
      jid: {
        not: jid,
      },
    },
    orderBy: [{ featured: 'desc' }, { epoch: 'desc' }],
    include: { location: true, category: true, tags: true },
    take: 3,
  })

  // getStaticProps Fails to Serialize Date Object
  const job = serializeDateObjects(rawData)
  const relatedJobs = serializeDateObjects(rawRelatedJobs)

  await prisma.$disconnect()

  return {
    props: {
      job: job,
      // Adds .daysSinceEpoch property to job
      relatedJobs: extendJobsData(relatedJobs),
      twitterShareLink: getJobTwitterShareLink(job),
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Job
