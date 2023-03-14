import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getSongByArtists } from "@/redux/actions/songlist.action";
import MainLayout from "@/components/Main";
import { useAppSelector } from "@/redux/store";
import HTMLReactParser from "html-react-parser";
import styles from "../../styles/Lyric.module.scss";
import Link from "next/link";
import Divider from "@/components/Divider";
import Chord from '@tombatossals/react-chords/lib/Chord';


import GuitarChord from 'react-guitar-chords';
 
const MyChord = () => {
  return (
    <GuitarChord
      chordName='C major'
      frets={['x', 3, 2, 0, 1, 0]}
    />
  );
}
const GuitarChordComponent =() => {
    const chord = {
        frets: [1, 3, 3, 2, 1, 1],
        fingers: [1, 3, 4, 2, 1, 1],
        barres: [1],
        capo: false,
    }
    const instrument = {
        strings: 6,
        fretsOnChord: 4,
        name: 'Guitar',
        keys: [],
        tunings: {
            standard: ['E', 'A', 'D', 'G', 'B', 'E']
        }
    }
    const lite = false // defaults to false if omitted
    return (
        <Chord
            chord={chord}
            instrument={instrument}
            lite={lite}
        />
    )
}
const GenerateChordLyric = ({ str }: any) => {
    let replaceStr;
    if (str) {

        replaceStr = str.replace(/\[(.*?)\]/g, "<span> $1</span>")
        replaceStr = replaceStr.replace(/,/g, "<br/>")
    }
    return (
        <div className={styles.lyricChord}>
            {str && HTMLReactParser(replaceStr)}
        </div>
    )
}

function Songs(props: any) {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const {state} = location;
    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [currentArtistSong, setCurrentArtistSong] = useState<any>({});
    const [currentArtistAllSong, setCurrentArtistAllSong] = useState<any>([]);

    const songs = useAppSelector(state => state.songs.songLists);
    // const [artistSongs, setArtistSong] = useState(songs);

    React.useEffect(() => {
        let { artist, songname } = router.query;
        // console.log(router)
        // console.log(artistSongs)
        if (songs.length > 0) {
            let artistSongs: any = [];
            songs.filter((item: any) => {
                if (item.artist === artist && item.songname === songname) {
                    setCurrentArtistSong(item)
                }
                if (item.artist === artist) {
                    artistSongs.push(item)
                }
                // console.log(item)
            })
            setCurrentArtistAllSong(artistSongs)
        }
    }, [songs, router])


    return (
        <MainLayout>

            <div className={"items"} style={{ paddingTop: "55px" }}>
                {/* {artistSongs.map((item :any, ind :number) => {
            return (<div className={"item"} key={ind} onClick={() => handleLyricChord(item)}>
                    <h4>{item.songname}</h4>
                </div>)
            })} */}
                <h1>Artist : {currentArtistSong.artist}</h1>
                {/* <GuitarChordComponent/> */}
                <div className="flex justify-around">
                    <div className="w-1/2 px-4 max-md:px-1">

                    <GenerateChordLyric str={currentArtistSong.lyricChord} />
                    </div>
                    <div className="flex flex-col items-center w-1/2">
                        <div className=" bg-gray-400 px-2 py-3">
                            <div>
                                <h1 className="text-2xl font-bold">Related Lyrics  </h1>
                                <Divider />
                            </div>
                            <div className="px-2 flex flex-col">
                                {currentArtistAllSong && currentArtistAllSong.map((item: any, ind: number) => {
                                    return (
                                        <Link className=" border-b my-1 border-blue-600" key={ind} href={`/${item.artist}/${item.songname}`}>{item.songname}</Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}


export default Songs;
