
import { getAllSongLists } from 'redux/actions/songlist.action';
import store, { RootState, AppDispatch } from 'redux/store';
// import { AppDispatch } from '@/redux/store';
import styles from "../styles/Home.module.css"
import React, { useEffect } from 'react'
export default function Layout(props: any) {
    
    return (
        <div className={styles.slide }>
            {props.children}
        </div>
    )
}
