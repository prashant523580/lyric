import { getAllSongLists } from '@/redux/actions/songlist.action';
import { RootState,AppDispatch } from '@/redux/store';
// import { AppDispatch } from '@/redux/store';
import styles from "../styles/Home.module.css"
import React, { useEffect } from 'react'
import {useDispatch} from "react-redux";
export default function MainLayout(props: any) {
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(getAllSongLists());
    },[dispatch])
  return (
    <div className={styles.slide}>
        {props.children}
    </div>
  )
}
