import { AppProps } from 'next/dist/next-server/lib/router/router'

import '@/styles/globals.css'
import Header from '@/layouts/header'
import Footer from '@/layouts/footer'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
