
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
   
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("service-worker.js").then(
        function (registration) {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        }
      );
    });
  }

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
