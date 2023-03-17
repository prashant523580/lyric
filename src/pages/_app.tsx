
import MainLayout from 'components/Main'
import Navbar from 'components/Navbar/index'
import store from "redux/store"
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import Loading from './Loading'
import Layout from 'components/Layout'

export default function App({ Component, pageProps }: AppProps) {

  const [loading,setLoading] = React.useState(true);
React.useEffect(() => {
    setInterval(() => {
      setLoading(false)
    },2000)
},[loading])

  return (

loading ?<>
<Loading/>
</> :

    <Provider store={store}>

    <MainLayout>

        <Component {...pageProps} />
    </MainLayout>
   
    </Provider>




  )
}
