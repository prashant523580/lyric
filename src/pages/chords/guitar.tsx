
import Chord from "@tombatossals/react-chords/lib/Chord";
import GuitarChordData from "@tombatossals/chords-db/lib/guitar.json";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "components/Layout";
// import {Button} from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAllGuitarChords } from "../../redux/actions/chord.action";
// import NavigateLayout from "../../components/back-button/Back";
const styles = {
  inputControl: {
    padding: ".6em .3em",
    margin: "0 .3em"
  },
  btnNav: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: ".6em .3em"
  },
}
function GuitarChords() {
  const [currentChords, setCurrentChords] = useState([]);
  const [selectedChord, setSelectedChord] = useState({
    chord: "C",
    suffix: "all"
  })
  const [GuitarChordsData] = useState<any>(GuitarChordData.chords);
  // const Chords = useSelector(state=> state.Chords)
  // const dispatch = useDispatch();
  let instrument = {
    strings: 6,
    fretsOnChord: 4,
    name: "Guitar",
    keys: [],
    tunings: {
      standard: ["E", 'A', 'D', 'G', 'B', 'E']
    }
  }
  // useEffect(() => {
  // 	dispatch(GetAllGuitarChords());

  // },[dispatch])
  // useEffect(() =>{
  // 	if(Chords.guitar){
  // 		console.log(Chords)
  // 		// console.log(Object.keys(Chords.guitar).length)
  // 		setGuitarChordsData(Chords.guitar);
  // 	}

  // },[Chords])

  const handleChord = (e: any) => {
    let { name, value } = e.target
    setSelectedChord((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }
  useEffect(() => {
    console.log(selectedChord)
    // console.log(GuitarChordsData[selectedChord.chord])


    let selectedChords = GuitarChordsData[selectedChord.chord].filter((chord: any) => {
      if (chord.suffix === selectedChord.suffix) {
        return chord
      } else if (selectedChord.suffix === "all") {
        return chord
      }
    });
    setCurrentChords(selectedChords);

  }, [selectedChord, GuitarChordsData])
  useEffect(() => {
    if (GuitarChordsData) {

      setCurrentChords(GuitarChordsData["C"]);
      // console.log(GuitarChordsData.chords)
    }

  }, [GuitarChordsData]);
  const lite = false;
  return (
    <Layout>
    <div className="chord-container px-4">
      <Link className="border-b my-3" href="/chords/ukulele">Ukulele Chords</Link>
      <div className="flex space-x-2 my-2 bg-gray-800 p-4 items-center">
      <div className={"flex space-x-2 items-center"} >
        <h1 className="text-white capitalize">select chords:</h1>
        <select style={styles.inputControl} value={selectedChord.chord} name={"chord"} onChange={handleChord}>
          {
            GuitarChordsData && Object.keys(GuitarChordsData).map((key, ind) =>
              <option key={ind}> {key}</option>
            )
          }
        </select>
      </div>
      <div className={"flex space-x-2 items-center"} >
        <h1 className="text-white capitalize">Select Suffix</h1>
        <select style={styles.inputControl} onChange={handleChord} value={selectedChord.suffix} name={"suffix"}>
          <option> all </option>
          {
            GuitarChordsData[selectedChord.chord].map((chord: any, ind: number) =>

              <option key={ind}> {chord.suffix} </option>

            )
          }
        </select>
      </div>
      </div>
      <div className="h-full">

        {currentChords.length > 0 && currentChords.map((chord: any, ind: number) => {
          return (
            <div key={ind}>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: ".3em"
              }}>
                <h3>{chord.key} {chord.suffix}</h3>
              </div>
              <div className={"grid grid-cols-2 lg:px-6 max-md:px-2  gap-x-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:gap-x-2"}>

                {
                  chord.positions.map((pos: any, ind: number) => {
                    return (<Chord lite={lite} key={ind} instrument={instrument} chord={pos} />)
                  })
                }
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
     </Layout>
  )
}
export default GuitarChords;
