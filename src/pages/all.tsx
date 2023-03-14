import axios from "axios";
import Link from "next/link";
import {useRouter}from "next/router"
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import { useAppSelector } from "@/redux/store";
import MainLayout from "@/components/Main";
// import {getAllLyricChords} from "../../redux/actions/index.action";
const lyricChords = [
	{
	  "artist" : "1974 A.D",
	  "img" : "/images/1974ad-Logo.jpg",
	  "songs" :[
		{
		"songname": "Parelima",
		"lyricChord" : '[E]Pare[F#m]lima  [Asus2]lukai &nbsp; &nbsp;[E]rakhana, [E]anga[F#m]loma [Asus2]bandhi [E]rakhana  ',
		"beat":"4/4",
		"tempo":"93bpm",
		"key": "E major",
		"strum" : "D &nbsp;PD&nbsp; -U&nbsp; P",
		"chords" :[
			    {"chord":"E", "quality":"MAJ"},
			    {"chord" :"F#", "quality":"MIN"},
			    {"chord": "Asus2", "quality": ""},
			    {"chord" : "C#", "quality":"MIN"},
			    {"chord":"B","quality":"MAJ"}]
		},
		{
		"songname": "chudaina timro mayale",
		"lyricChord":"[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,samma [F] metinna [G]mera manaka [C]&nbsp; trishanaharu,yadi timi [G]najik navaye [E]Samma, betha [Dm]bardchha chota [G]pani ajhai tha[E]pinchha, [Am]&nbsp;jhan jhan mu[E]tuma [G]&nbsp; aago dank[D]inchha, [F]&nbsp; nabaljheko [C]ghau baljhin[G]chha,,,, bha[Am]nana ma[E]lai [C]&nbsp; timro the[G]gana,ba[Am]taunama[E]lai [C]&nbsp;timro cha[G]hana, mann pa[Dm]reka sa[F]bai ku[G]raha[C]ru, chit[E]thima nai sandhai lekhinou bhane, [Am]&nbsp;jhan jhan mu[E]tuma [G]&nbsp; aago dank[D]inchha, [F]&nbsp; nabaljheko [C]ghau baljhin[G]chha,,,[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,samma [F] metinna [G]mera manaka [C]&nbsp; trishanaharu,yadi timi [G]najik navaye [E]Samma, betha [Dm]bardchha chota [G]pani ajhai tha[E]pinchha, [Am]&nbsp;jhan jhan mu[E]tuma [G]&nbsp; aago dank[D]inchha, [F]&nbsp; nabaljheko [C]ghau baljhin[G]chha" ,
		"beat":"4/4",
		"tempo":"157bpm",
		"key": "A minor",
		"strum" : "D &nbsp;D&nbsp;UUD&nbsp; DUP",
		"chords" : [{"chord" :"A","quality":"MIN"},
			    {"chord":"C", "quality":"MAJ"},
			    {"chord" :"D", "quality":"MIN"},
			    {"chord": "E", "quality": "MAJ"},
			    {"chord" : "F", "quality":"MAJ"},
			    {"chord":"G","quality":"MAJ"}
			   ]
		}
	  ]
	},{

	  "artist": "Astha",
	  "img":"/images/1974ad-Logo.jpg",
	  "songs":[
		{
		 "songname": "Harpal Tyo Timrai",
		"lyricChord" : '[g]&nbsp;harpal tyo timrai muska[em]ko, yaada le[c] satauchha ane pi[d]rolchha malae,[g]nashalu ti timro tyo ka[em]alo kesh le, mero [c]bhoka pyaasha sabai lu[d]tyo oh ho \n [g]&nbsp;padne belama pan[em]ii ma \n kina h[c]o yesari sadhain to[d]lai rahanchu',
                "beat":"4/4",
                "tempo":"109bpm",
                "key": "G major",
                "strum" : "D &nbsp;DU&nbsp; -U&nbsp; DU",
                "chords" :[
                            {"chord":"E", "quality":"MAJ"},
                            {"chord" :"F#", "quality":"MIN"},
                            {"chord": "Asus2", "quality": "MAJ"},
                            {"chord" : "C#", "quality":"MIN"},
                            {"chord":"B","quality":"MAJ"}]
		}
	  ]
	},
    {

        "artist": "Uges Limbu",
        "img":"/images/1974ad-Logo.jpg",
        "songs":[
            {
                "songname": "Hamro Geet",
                "lyricChord" : '[C]Sochchu aaja ma prash[G]na, \n' +
                    '[Dm]Kina ho laddai [F]chhu ma aafai bhitra[C],\n',
                "beat":"4/4",
                "tempo":"109bpm",
                "key": "G major",
                "strum" : "D &nbsp;DU&nbsp; -U&nbsp; DU",
                "chords" :[
                    {"chord":"C", "quality":"MAJ"},
                    {"chord" :"G", "quality":"MIN"},
                    {"chord": "Asus2", "quality": "MAJ"},
                    {"chord" : "C#", "quality":"MIN"},
                    {"chord":"B","quality":"MAJ"}]
            }
        ]
    }
];
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
    <MainLayout>

    <div className="pt-10" >
        {lyricChords.map((item : any, ind :number) => {
            return (
                <div key={ind} className="bg-gray-800 px-5 my-4" onClick={() => handleArtistSongLists(item)}>
                <h1 className="text-green-400">{item.songname}</h1>
                <p  className="text-white">{item.artist}</p>
                </div>
                )
            })}
    </div>
            </MainLayout>
    )
}

export default HomePage;
