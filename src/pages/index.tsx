import Head from 'next/head'
import Header from '../components/sections/Header'
import { GetStaticProps } from 'next'
import prisma from '../lib/prisma'
import { getUrlSlug, sortFeaturedJobs } from '../utils'
import NavBar from '../components/sections/NavBar'
import Footer from '../components/sections/Footer'
import { ONE_MONTH_EPOCH } from '../lib/constants'
import CategoryPreview from '../components/sections/CategoryPreview'

type HomeProps = {
  categories: Category[] & {
    jobs: JobWithRelations[]
  }
}

const Home = ({ categories }: HomeProps) => {
  return (
    <>
      <Head>
        <title>
          Remote Jobs in Programming, Marketing, Design and more | Remoteja
        </title>
        <meta
          key="title"
          name="title"
          content="Remote Jobs in Programming, Marketing, Design and more | Remoteja"
        />
        <meta
          key="description"
          name="description"
          content="Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more. Say yes to remote working and start hiring the best talent from all corners of the world today."
        />

        {/* Open Graph / Facebook */}
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:url" property="og:url" content="https://remoteja.com/" />
        <meta
          key="og:title"
          property="og:title"
          content="Remote Jobs in Programming, Marketing, Design and more | Remoteja"
        />
        <meta
          key="og:description"
          property="og:description"
          content="Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more. Say yes to remote working and start hiring the best talent from all corners of the world today."
        />
        <meta
          key="og:image"
          property="og:image"
          content={`https://i.ibb.co/FsYTW2Z/remoteja1200x628.png`}
        />

        {/* Twitter */}
        <meta key="twitter:site" name="twitter:site" content="@remoteja" />
        <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta
          key="twitter:image:alt"
          name="twitter:image:alt"
          content="Remoteja logo"
        />
      </Head>
      <NavBar />
      <Header
        h1="The Latest Remote Jobs"
        h2="Browse thousands of jobs in Programming, Design, Sales and more from the companies hiring global talent."
      />
      {/* @ts-ignore */}
      {categories.map(({ name, slug, jobs }) => (
        <CategoryPreview name={name} slug={slug} jobs={jobs} />
      ))}
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
      jobs: {
        where: {
          createdEpoch: {
            gt: Math.round(Date.now() / 1000) - ONE_MONTH_EPOCH,
          },
        },
        select: {
          jid: true,
          applyCTA: true,
          companyName: true,
          createdEpoch: true,
          featured: true,
          tags: {
            select: {
              name: true,
              slug: true,
            },
          },
          location: {
            select: {
              name: true,
            },
          },
          title: true,
          type: {
            select: {
              name: true,
            },
          },
        },
        take: 25,
        orderBy: { createdEpoch: 'desc' },
      },
    },
  })

  const extendedData = categories.map((category) => {
    const extendedJobData = category.jobs.map((job) => {
      return {
        ...job,
        daysSinceEpoch: Math.floor(
          (Math.round(Date.now() / 1000) - job.createdEpoch) / 86400
        ),
        urlSlug: getUrlSlug(job),
      }
    })
    return {
      ...category,
      // @ts-ignore
      jobs: sortFeaturedJobs(extendedJobData),
    }
  })

  await prisma.$disconnect()

  return {
    props: {
      categories: extendedData,
    },
    // Attempt to re-generate page on request at most once every second
    revalidate: 1,
  }
}

export default Home
