import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/store";
import Layout from "components/Layout";
function Songs(props: any) {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const {state} = location;
    const router = useRouter();
    const [artistCategories, setArtistCategories] = useState<Array<string>>([]);

    const songs = useAppSelector(state => state.songs.songLists);
    // const [artistSongs, setArtistSong] = useState(songs);



    React.useEffect(() => {
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
        <Layout>
            <div className={" px-4 py-4"} >
                {artistCategories.map((item: any, ind: number) => {
                    return (
                        <div className={"bg-gray-800 my-2 px-2 py-2 text-white rounded-md cursor-pointer active:bg-gray-600"}
                            key={ind}
                            onClick={() => handleArtistSongList(item)}
                        >
                            <h4 className="text-gray-300">{item}</h4>
                            <p className="text-white">songs: {getLength(item)}</p>
                        </div>)
                })}

            </div>
        </Layout>
    )
}


export default Songs;
