import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/store";
import HTMLReactParser from "html-react-parser";
import styles from "../../styles/Lyric.module.scss";
// import Link from "next/link";
// import Divider from "@/components/Divider";
import Chord from '@tombatossals/react-chords/lib/Chord';
import GuitarChordsData from "@tombatossals/chords-db/lib/guitar.json"
import UkuleleChordsData from "@tombatossals/chords-db/lib/ukulele.json";
interface ChordSuffixTypes {
    chord: string,
    suffix: string
}
interface ChordsTypes {
    chords: any,
    instrumentName?: string
}
interface LyricChordTypes {
    artist: string
    beat: string
    chords: Array<object>
    key: string
    lyricChord: string
    songname: string
    strum: string
    tempo: string
}
import GuitarChord from 'react-guitar-chord';


const GuitarChordComponent = (props: any) => {
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
    return (str && HTMLReactParser(replaceStr))
}


function Songs(props: any) {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const {state} = location;
    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [currentArtistSong, setCurrentArtistSong] = useState<LyricChordTypes>({
        artist: "",
        beat: "",
        chords: [],
        key: "",
        lyricChord: "",
        songname: "",
        strum: "",
        tempo: ""
    });

    const [currentGuitarChords, setCurrentGuitarChords] = React.useState<Array<object>>([]);
    const [currentUkuleleChords, setCurrentUkuleleChords] = React.useState<Array<object>>([]);
    const [chords, setChords] = React.useState<Array<object>>([]);
    const [showChordPositionChart, setShowChordPositionChart] = React.useState(false);
    const [isShowChart, setIsShowChart] = React.useState(false);
    const [currentChordPositions, setCurrentChordPositions] = React.useState<any>()
    const [currentArtistAllSong, setCurrentArtistAllSong] = useState<any>([]);
    const chordRef = React.useRef<any>();
    const songs = useAppSelector(state => state.songs.songLists);
    const [isGuitarChord, setIsguitarChord] = React.useState(true);
    const [options, setOptions] = useState({
        play: false,
        speed: 3,
        transpose: 0,
        results: "",
        scales: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    })
    let guitarChordsData: any = GuitarChordsData.chords;
    let ukuleleChordsData: any = UkuleleChordsData.chords;

    React.useEffect(() => {
        let { artist, songname } = router.query;
        if (songs.length > 0) {
            let artistSongs: any = [];
            songs.filter((item: any) => {
                if (item.artist === artist && item.songname === songname) {
                    setCurrentArtistSong(item)
                }
                if (item.artist === artist) {
                    artistSongs.push(item)
                }
            })
            setCurrentArtistAllSong(artistSongs)
        }

    }, [songs, router])

    const getInstrumentChord = (instrument: any) => {
        let chordSuffixObject: Array<object> = []
        Object.keys(instrument).map((key: any) => {
            instrument[key].filter((chord: any) => {
                chords.map((currentChord: any) => {

                    if (chord.key === currentChord.chord && chord.suffix === currentChord.suffix) {
                        chordSuffixObject.push(chord)
                    }
                })
            })
        })
        return chordSuffixObject
        // setcurrentGuitarChords(chordSuffixObject)
    }

    React.useEffect(() => {
        updateTranspose(0)
        setChords(currentArtistSong.chords)
    }, [currentArtistSong])

    React.useEffect(() => {
        setCurrentGuitarChords(getInstrumentChord(guitarChordsData))
        setCurrentUkuleleChords(getInstrumentChord(ukuleleChordsData))
    }, [guitarChordsData, ukuleleChordsData, chords])

    const transposeChord = (chord: string, amount: number) => {
        // console.log(typeof(chord), typeof(amount))
        var normalizeMap: any = { "Cb": "B", "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#", "E#": "F", "B#": "C" }
        return chord.replace(/[CDEFGAB](#|b|sharp)?/g,
            function (match) {
                // console.log(match)
                var i = (options.scales.indexOf(normalizeMap[match] ? normalizeMap[match] : match) + amount) % options.scales.length;
                // console.log(options.scales[i + options.scales.length])
                return options.scales[i < 0 ? i + options.scales.length : i];
            }
        );
    }
    const updateTranspose = (n: any) => {
        let elements = chordRef.current.children;
        Array.from(elements).forEach((span: any, ind) => {
            if (span.nodeName === "SPAN") {
                //alert(transposeChord(span.innerText,2))
                let currentChord = elements[ind].innerText
                currentChord.charAt(0).toUpperCase();
                span.innerHTML = transposeChord(currentChord, n)
            }
        })

        let chordArray: any = chords.map((chord: any) => {
            return {
                chord: transposeChord(chord.chord, n),
                suffix: chord.suffix
            }
        })
        let transposedChord: any = chordArray.map(({ chord, suffix }: any) => {
            if (isGuitarChord) {


                if (chord == "A#") {
                    chord = "Bb";
                } else if (chord == "D#") {
                    chord = "Eb"
                } else if (chord == "G#") {
                    chord = "Ab"
                } else if (chord == "B") {
                    chord = "B"
                } else if (chord == "A") {
                    chord = "A"
                } else if (chord == "C") {
                    chord = "C"
                } else if (chord == "D") {
                    chord = "D"
                } else if (chord == "G") {
                    chord = "G"
                } else if (chord == "E") {
                    chord = "E"
                } else if (chord == "F") {
                    chord = "F"
                } else {
                    chord = chord
                }
            } else {
                if (chord == "A#") {
                    chord = "Bb";
                } else if (chord == "D#") {
                    chord = "Eb"
                } else if (chord == "G#") {
                    chord = "Ab"
                } else if (chord == "B") {
                    chord = "B"
                } else if (chord == "A") {
                    chord = "A"
                } else if (chord == "C") {
                    chord = "C"
                } else if (chord == "D") {
                    chord = "D"
                } else if (chord == "G") {
                    chord = "G"
                } else if (chord == "E") {
                    chord = "E"
                } else if (chord == "F") {
                    chord = "F"
                } else if (chord == "C#") {
                    chord = "Db"
                } else if (chord == "F#") {
                    chord = "Gb"
                } else {
                    chord = chord
                }
            }
            return {
                chord,
                suffix
            }
        });
        setChords(transposedChord);
    }
    const updateSpeed = (e: any) => {
        setOptions((pre: any) => {
            return {
                ...pre,
                speed: e.target.value
            }
        })
    }


    //Render Chord Chart by instument  
    const RenderCurrentInstrumentChords = ({ chords, instrumentName }: ChordsTypes) => {
        let instrument: any = {}
        // console.log(instrumentName)
        if (instrumentName === "Guitar") {
            // console.log(chords)

            instrument = {
                strings: 6,
                fretsOnChord: 4,
                name: 'Guitar',
                keys: [],
                tunings: {
                    standard: ['E', 'A', 'D', 'G', 'B', 'E']
                }
            }
        } else {
            // console.log(chords);
            instrument = {
                strings: 4,
                fretsOnChord: 4,
                name: 'Ukulele',
                keys: [],
                tunings: {
                    standard: ["G", "C", "E", "A"]
                }
            }
        }
        const lite = false

        return (
            <div className="mt-6 overflow-x-auto w-full grid grid-cols-3 lg:px-6 max-md:px-2  gap-x-2 sm:grid-cols3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-2">

                {
                    chords.map((chord: any, ind: number) => {

                        return (
                            <div className="relative border my-1 cursor-pointer" key={ind} onClick={() => {
                                setShowChordPositionChart(true),
                                    setCurrentChordPositions(chord)
                            }}>
                                <Chord chord={chord.positions[0]} lite={lite} instrument={instrument} />
                                <p className="text-center">{chord.key + " " + chord.suffix}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    // render chords all positions
    const RenderChordPositions = ({ chord, instrumentName }: any) => {
        let instrument: any = {}
        console.log(instrumentName)
        if (instrumentName === "Guitar") {
            instrument = {
                strings: 6,
                fretsOnChord: 4,
                name: 'Guitar',
                keys: [],
                tunings: {
                    standard: ['E', 'A', 'D', 'G', 'B', 'E']
                }
            }
        } else {
            instrument = {
                strings: 4,
                fretsOnChord: 4,
                name: 'Ukulele',
                keys: [],
                tunings: {
                    standard: ["G", "C", "E", "A"]
                }
            }
        }

        return (
            <>

                <Modal
                    disableScrollLock={true}
                    open={showChordPositionChart}
                    onClose={() => setShowChordPositionChart(false)}
                    sx={{
                        pr: "0 !important",
                        overflowY: "auto"
                    }}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
                >

                    <div className="absolute top-[50%] left-[50%] p-4 -translate-x-[50%] -translate-y-[50%] bg-white border-none">
                        <div className="flex justify-between">
                            <h1>{chord.key + " " + chord.suffix} </h1>
                            <span onClick={() => setShowChordPositionChart(false)}>ESC</span>
                        </div>
                        <div className="flex flex-wrap justify-center  h-[550px] overflow-y-auto">
                            {chord.positions.map((chord: any, ind: number) => {

                                return (
                                    <div className="" key={ind}>
                                        <Chord lite={false} instrument={instrument} chord={chord} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Modal>

            </>
        )
    }
    // const RenderCurrentInstrumentChords = ({chords,instrumentName}) => {

    // }
    return (
        <>

            <div className={"px-4 "} >
                <div>

                    <h1>Artist : {currentArtistSong?.artist}</h1>
                    <h2>Song : {currentArtistSong.songname}</h2>
                    <h2>Beat : {currentArtistSong.beat}</h2>
                    <h2>Tempo: {currentArtistSong.tempo}</h2>
                    <h2>Key : {currentArtistSong.key}</h2>
                </div>
                <Button onClick={() => setIsShowChart(!isShowChart)}>
                    {!isShowChart ? "Show chord Chart" : "Hide Chord Chart"}
                </Button>
                {
                    isShowChart &&
                    <div className={"bg-gray-200 p-2 " }>
                        <div> 
                            <p> Chord: {isGuitarChord ? "Guitar Chords" : "Ukulele Chords"}</p>
                        <Button onClick={() => setIsguitarChord(!isGuitarChord)}>{isGuitarChord ? "Guitar" : "Ukulele"}</Button>
                        </div>
                        {/* display chord by instrument */}
                        {
                            <RenderCurrentInstrumentChords instrumentName={isGuitarChord ? "Guitar" : "Ukulele"} chords={isGuitarChord ? currentGuitarChords : currentUkuleleChords} />
                        }

                        {/* modal view */}
                        {showChordPositionChart && <RenderChordPositions instrumentName={isGuitarChord ? "Guitar" : "Ukulele"} chord={currentChordPositions} />
                        }
                    </div>
                }
                {/* <GuitarChordComponent/> */}
                <div className="flex justify-around border-t my-3 py-4">
                    <div className="w-2/2 px-4 pb-10 max-md:px-1 ">
                        <div ref={(node: any) => chordRef.current = node} className={styles.lyricChord}>
                            <GenerateChordLyric str={currentArtistSong?.lyricChord} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-1/2">
                        {/* <div className=" px-2 py-3">
                            <div className=" flex flex-col items-center my-2">
                                <h1 className="text-xl font-bold">Related Lyric and Chordss  </h1>
                                <Divider />
                            </div>
                            <div className="px-2 flex flex-col bg-gray-400 ">
                                {currentArtistAllSong && currentArtistAllSong.map((item: any, ind: number) => {
                                    return (
                                        <Link className=" border-b my-1 border-blue-600" key={ind} href={`/${item.artist}/${item.songname}`}>{item.songname}</Link>
                                    )
                                })}
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-black">

                    <Button onClick={() => updateTranspose(-1)}>-</Button>
                    <span className="text-white">{0}</span>
                    <Button onClick={() => updateTranspose(1)}>+</Button>
                    <div>
                        {/* <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default range</label> */}
                        <input id="default-range" onChange={updateSpeed} type="range" value={options.speed} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    </div>
                </div>
            </div>
        </>
    )
}


export default Songs;
