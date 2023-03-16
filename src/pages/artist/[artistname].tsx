import axios from "axios";
import Link from "next/link";
import {useRouter}from "next/router"
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import { useAppSelector } from "redux/store";
// import {getAllLyricChords} from "../../redux/actions/index.action";

function SongLists() {
    const lyricChords = useAppSelector(state => state.songs.songLists);
    const [artistSongList, setArtistSongList] = useState([]);
    const router = useRouter();
    React.useEffect(() => {
        let artist = router.query.artistname;
        let artistSongs: any = [];
        lyricChords.filter((item: any) => {
            if(item.artist === artist){
                // console.log(item)
                artistSongs.push(item)
            }
        })
        // console.log(artistSong)
        setArtistSongList(artistSongs);
    },[router.query, lyricChords])
    const handleArtistSongLists = (item : any) => {
        // console.log(item)
         router.push(`/${item.artist}/${item.songname}`)
    }
    return (
    <>

    <div className="px-4" >
        {artistSongList.map((item : any, ind :number) => {
            return (
                <div key={ind} className="bg-gray-800 px-5 my-4 cursor-pointer" onClick={() => handleArtistSongLists(item)}>
                <h1 className="text-green-400">{item.songname}</h1>
                <p  className="text-white">{item.artist}</p>
                </div>
                )
            })}
    </div>
            </>
    )
}

export default SongLists;
