import { AppProps } from 'next/dist/next-server/lib/router/router'

import '@/styles/globals.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror-theme-github/theme/github.css'
import '@/styles/codemirror.css'
import '@/styles/markdown.css'

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
