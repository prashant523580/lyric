
import store from 'redux/store';

import React, { useEffect } from 'react'
import Layout from './Layout';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { getAllSongLists } from 'redux/actions/songlist.action';
export default function MainLayout(props: any) {
  const dispatch = useDispatch<any>();
  useEffect(() => {
      dispatch(getAllSongLists());
  }, [dispatch])
  return (
    // <Provider store={store}>
    <>
      <Navbar/>

        
        {props.children}

    </>
    // </Provider>
  )
}
