
import MainLayout from 'components/Main'
import store from "redux/store"
import 'styles/globals.css'
import styles from "styles/Home.module.css";
import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setInterval(() => {
      setLoading(false)
    }, 2000)

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

  }, [loading])

  return (

    loading ? 
    <div className='flex flex-col justify-center items-center h-[100vh]'>

    <div className={styles.lds_ripple}><div></div><div></div></div>
    <h1>Loading...</h1>
     </div>
     :

      <Provider store={store}>

        <MainLayout>

          <Component {...pageProps} />
        </MainLayout>

      </Provider>




  )
}
