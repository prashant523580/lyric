
import {useRouter}from "next/router"
import { useAppSelector } from "redux/store";
import Layout from "components/Layout";
// import {getAllLyricChords} from "../../redux/actions/index.action";

function HomePage() {
    // const dispatch = useDispatch();
    const lyricChords = useAppSelector(state => state.songs.songLists);
    // const [lyricChords, setLyricChords] = useState([]);
    const router = useRouter();
    // const history = useNavigate();
    // useEffect(() => {
    //     // dispatch(getAllLyricChords());
    // }, [dispatch])

    const handleArtistSongLists = (artist : any) => {
        // console.log()
         router.push(`/${artist.artist}/${artist.songname}`)
    }
    return (
    <Layout>
    

    <div className="pt-10 px-5" >
        {lyricChords.map((item : any, ind :number) => {
            return (
                <div key={ind} className="bg-gray-800 px-5 my-4 cursor-pointer hover:bg-gray-500 active:bg-gray-600" onClick={() => handleArtistSongLists(item)}>
                <h1 className="text-green-400">{item.songname}</h1>
                <p  className="text-white">{item.artist}</p>
                </div>
                )
            })}
    </div>
        
            </Layout>
    )
}

export default HomePage;
