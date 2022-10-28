import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'

//@ts-ignore
function MyApp({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return  <SessionProvider session={session}>
            <Head>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <RecoilRoot>
            <Component {...pageProps} />
            </RecoilRoot>
          </SessionProvider>


}

export default MyApp
