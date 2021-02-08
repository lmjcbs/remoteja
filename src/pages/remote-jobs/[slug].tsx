import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
import React from 'react'
import NavBar from '../../components/sections/NavBar'
import Footer from '../../components/sections/Footer'
import theme from '../../styles/theme'
import JobCardContainer from '../../components/sections/JobCardContainer'
import { device } from '../../lib/mediaQueries'

type JobsProps = {
  job: JobWithRelations
  relatedJobs: JobWithRelations[]
  twitterShareLink: string
}

const Job = ({ job, relatedJobs, twitterShareLink }: JobsProps) => {
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
    <>
      <Head>
        <title>Remote {job.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* meta description first 300  */}
      </Head>
      <NavBar />

      <main>
        <div className="job-nav">
          <Link href="/" scroll={false}>
            <div className="nav-item">
              <ArrowLeftIcon size={6} color="gray.700" />
              <a>All Remote Jobs</a>
            </div>
          </Link>
          <Link href={`/categories/${job.category.slug}`}>
            <div className="nav-item">
              <a>More {job.category.name} Jobs </a>
              <ArrowRightIcon size={6} color="gray.700" />
            </div>
          </Link>
        </div>

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
                <Link href={`/locations/${job.location.slug}`}>
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

        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: job.descriptionAsHTML }}
        ></div>

        <Flex direction="row" align="center" justify="space-between" mt={10}>
          <div className="apply-cta">
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
          </div>

          <Flex direction="row" items="center" p={1}>
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
        <div className="related-jobs">
          {relatedJobs.length > 0 ? (
            <div className="mt-12">
              <h4 className="text-xl font-semibold text-gray-700">
                Similar Jobs
              </h4>
              <div>
                <JobCardContainer jobs={relatedJobs} />
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
      <style jsx>{`
        .wrapper {
          width: 100%;
          background-color: whitesmoke;
          flex-grow: 1;
        }
        main {
          display: flex;
          flex-direction: column;
          margin: 2rem auto;
          max-width: 50rem;
          padding: 0rem 0.3rem 0rem 0.3rem;
        }
        .job-nav {
          display: flex;
          justify-content: space-between;
        }
        .nav-item {
          display: flex;
          align-items: center;
          font-weight: bold;
          cursor: pointer;
          font-size: 0.85rem;

          @media ${device.sm} {
            font-size: 1rem;
          }
        }
        .apply-cta {
          background-color: ${theme.colors.primary};
          color: whitesmoke;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          cursor: pointer;
          &:hover {
            color: ${theme.colors.secondary};
          }
        }
        .related-jobs {
          margin: 2rem 0;
          font-weight: bolder;
        }
        .description {
          font-size: 1rem;

          @media ${device.sm} {
            font-size: 1.125rem;
          }
        }
        :global(.description ul) {
          list-style: none;
        }
        :global(.description ul li::before) {
          content: '▸';
          color: ${theme.colors.primary};
          font-weight: bolder;
          display: inline-block;
          width: 1em;
          margin-left: 0em;
        }
        :global(.description a) {
          display: inline-block;
          padding: 0rem 0.25rem;
          background-color: rgba(31, 204, 189, 0.2);
          &:hover {
            background-color: rgba(31, 204, 189, 0.4);
          }
        }
        :global(.description a strong) {
          font-weight: bold;
          font-size: 1.125rem;
        }
        :global(.description strong) {
          font-size: 1.25rem;
          font-weight: bolder;
        }
        :global(.description div) {
          margin-top: 0.4rem;
        }
      `}</style>
    </>
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
