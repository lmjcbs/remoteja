import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query-devtools'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { NavBar, Footer } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Remoteja</title>
        <meta property="og:title" content="Remoteja" key="title" />
        <meta
          property="og:description"
          name="description"
          key="description"
          content=""
        />
        <meta charSet="utf-8" key="charSet" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <div id="wrapper" className="h-full flex flex-col">
        <NavBar />
        <div className="flex-grow w-full mx-auto justify-center max-w-5xl px-2 sm:px-6 lg:px-8">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </Provider>
  )
}

export default MyApp
