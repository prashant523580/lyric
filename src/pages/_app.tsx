
import MainLayout from '@/components/Main'
import Navbar from '@/components/Navbar/index'
import store from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import Loading from './Loading'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <Navbar/>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </Suspense>
  )
}
