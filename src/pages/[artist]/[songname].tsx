import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getSongByArtists } from "@/redux/actions/songlist.action";
import MainLayout from "@/components/Main";
import { useAppSelector } from "@/redux/store";
import HTMLReactParser from "html-react-parser";
import styles from "../../styles/Lyric.module.scss";
function Songs(props: any) {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const {state} = location;
    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [currentArtistSong, setCurrentArtistSong] = useState<any>({});

    const songs = useAppSelector(state => state.songs.songLists);
    // const [artistSongs, setArtistSong] = useState(songs);


  
    React.useEffect(() => {
        let { artist, songname } = router.query;
            // console.log(router)
            // console.log(artistSongs)
        if (songs.length > 0) {
            
            songs.filter((item: any) => {
                if(item.artist === artist && item.songname === songname)
                setCurrentArtistSong(item)
                // console.log(item)
            })
        }
        // dispatch(getSongByArtists({artist,song}))
        // console.log(router)
    }, [songs,router])
    const handleLyricChord = (lyricChord: any) => {
        // navigate("/lyrics", {
        //     state: lyricChord
        // })
    }

    const GenerateChordLyric = ( {str} : any) => {
        let  replaceStr;
        React.useEffect(() => {
            console.log(str)
            
        },[str])
        if(str){

            replaceStr = str.replace(/\[(.*?)\]/g, "<span> $1</span>")
            replaceStr = replaceStr.replace(/,/g, "<br/>")
        }
        return (
            <div className={styles.lyricChord}>
                { str && HTMLReactParser(replaceStr)}
            </div>
        )
    }
    return (
        <MainLayout>

            <div className={"items"} style={{ paddingTop: "55px" }}>
                {/* {artistSongs.map((item :any, ind :number) => {
            return (<div className={"item"} key={ind} onClick={() => handleLyricChord(item)}>
                    <h4>{item.songname}</h4>
                </div>)
            })} */}
                <h1>Artist : {currentArtistSong.artist}</h1>
                <GenerateChordLyric str={currentArtistSong.lyricChord}/>
            </div>
        </MainLayout>
    )
}


export default Songs;
