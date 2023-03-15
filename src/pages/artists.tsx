import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getSongByArtists } from "@/redux/actions/songlist.action";
import MainLayout from "@/components/Main";
import { useAppSelector } from "@/redux/store";
import HTMLReactParser from "html-react-parser";
function Songs(props: any) {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const {state} = location;
    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [currentArtistSong, setCurrentArtistSong] = useState<any>({});
    const [artistCategories, setArtistCategories] = useState<Array<string>>([]);

    const songs = useAppSelector(state => state.songs.songLists);
    // const [artistSongs, setArtistSong] = useState(songs);



    React.useEffect(() => {
        let { artist, songname } = router.query;
        // console.log(router)
        // console.log(artistSongs)
        if (songs.length > 0) {
            let artistCategory = songs.reduce((values: Array<string>, item: any) => {
                if (!values.includes(item.artist)) {
                    values.push(item.artist)
                }
                return values
            }, [])
            // console.log(artistCategory)
            setArtistCategories(artistCategory)
        }
        // dispatch(getSongByArtists({artist,song}))
        // console.log(router)
    }, [songs])

    React.useEffect(() => {
        let artistObj: any = {};
        
        
        // console.log(artistObj, arry)
    }, [artistCategories])
    const getLength = (artist: any) => {
        let arry : any= []
        songs.filter((item: any) => {
                if(item.artist === artist){
                    arry.push(item)
                }
            })
        return arry.length
    }
    const handleArtistSongList = (artist: any) => {
        router.push(`/artist/${artist}`)
    }

    return (
        <>
            <div className={" px-4 py-4"} >
                {artistCategories.map((item: any, ind: number) => {
                    return (
                        <div className={"bg-gray-700 my-2 px-2 py-2 text-white rounded-md cursor-pointer active:bg-gray-600"}
                            key={ind}
                            onClick={() => handleArtistSongList(item)}
                        >
                            <h4 className="text-green-400">{item}</h4>
                            <p>songs: {getLength(item)}</p>
                        </div>)
                })}

            </div>
        </>
    )
}


export default Songs;
