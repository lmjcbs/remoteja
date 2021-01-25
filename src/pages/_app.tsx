import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import NavBar from '../components/sections/NavBar'
import Footer from '../components/sections/Footer'
import { ChakraProvider } from '@chakra-ui/react'

import * as gtag from '../lib/gtag'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider>
      <Head>
        <meta charSet="utf-8" key="charSet" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <title>
          Remoteja | Remote Jobs in Programming, Marketing, Design and more
        </title>
        <meta
          property="title"
          key="title"
          content="Remoteja | Remote Jobs in Programming, Marketing, Design and more"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Remoteja | Remote Jobs in Programming, Sales, Marketing, Design and more"
        />
        <meta
          property="description"
          key="description"
          content="Say yes to remote working and start hiring the best talent from all corners of the world today. Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more."
        />
        <meta
          property="og:description"
          key="og:description"
          content="Say yes to remote working and start hiring the best talent from all corners of the world today. Remoteja has the lastest listings for remote jobs in Programming, Sales, Maketing, Design and more."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@remoteja" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <div id="wrapper" className="h-full flex flex-col">
        <NavBar />
        <div className="flex-grow w-full mx-auto justify-center max-w-5xl px-2 sm:px-6 lg:px-8">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ChakraProvider>
  )
}

export default MyApp
