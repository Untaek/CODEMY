import Head from 'next/head'
import { AppProps } from 'next/dist/next-server/lib/router/router'

import '@/styles/globals.css'
import '@/styles/markdown.css'
import 'xterm/css/xterm.css'

import Header from '@/layouts/header'
import Footer from '@/layouts/footer'
import { isSSR } from '@/utils'
import { createStores, StoresContext, TStore } from '@/stores'

let stores: TStore

if (isSSR || !stores) {
  stores = createStores()
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <StoresContext.Provider value={stores}>
        <Head>
          <title>코드더미</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </StoresContext.Provider>
    </>
  )
}

export default MyApp
