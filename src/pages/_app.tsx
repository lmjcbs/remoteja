import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import * as gtag from '../lib/gtag'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Layout>
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" key="charSet" />
        <title>
          Remoteja | Remote Jobs in Programming, Sales, Marketing, Design and
          more
        </title>
        <meta
          name="title"
          content="Remoteja | Remote Jobs in Programming, Sales, Marketing, Design and more"
        />
        <meta
          name="description"
          content="Say yes to remote working and start hiring the best talent from all corners of the world today. Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more."
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta property="og:site_name" content="Remoteja" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://remoteja.com/" />
        <meta
          property="og:title"
          content="Remoteja | Remote Jobs in Programming, Sales, Marketing, Design and more"
        />
        <meta
          property="og:description"
          content="Say yes to remote working and start hiring the best talent from all corners of the world today. Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more."
        />
        <meta property="og:image" content={`/public/remoteja1200x628.png`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://remoteja.com/" />
        <meta
          property="twitter:title"
          content="Remoteja | Remote Jobs in Programming, Sales, Marketing, Design and more"
        />
        <meta
          property="twitter:description"
          content="Say yes to remote working and start hiring the best talent from all corners of the world today. Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more."
        />
        <meta
          property="twitter:image"
          content={`/public/remoteja1200x628.png`}
        />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Layout>
  )
}

export default MyApp
