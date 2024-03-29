import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import * as gtag from '../lib/gtag'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import ScrollButton from '../components/ScrollButton'

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="Remoteja" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
        <ScrollButton />
      </ChakraProvider>
    </Layout>
  )
}

export default MyApp
