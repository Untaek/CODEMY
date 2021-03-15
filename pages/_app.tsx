import { AppProps } from 'next/dist/next-server/lib/router/router'

import '@/styles/globals.css'
import '@/styles/markdown.css'

import Header from '@/layouts/header'
import Footer from '@/layouts/footer'
import { isSSR } from '@/utils/index'
import { createStores, StoresContext, TStore } from '@/stores/index'

let stores: TStore

if (isSSR || !stores) {
  stores = createStores()
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <StoresContext.Provider value={stores}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </StoresContext.Provider>
    </>
  )
}

export default MyApp
