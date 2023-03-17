
import Chord from "@tombatossals/react-chords/lib/Chord";
import UkeleleChordData from "@tombatossals/chords-db/lib/ukulele.json";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "components/Layout";
// import {Box,Button,FormControl,Select,InputLabel,MenuItem} from "@mui/material";
// import { useDispatch,useSelector } from "react-redux";

// import { GetAllGuitarChords } from "../../redux/actions/chord.action";
const styles = {
  container: {
    // background: `url(${ukulele})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative"
  },
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
function UkeleleChords() {
  const [currentChords, setCurrentChords] = useState([]);
  const [selectedChord, setSelectedChord] = useState({
    chord: "C",
    suffix: "all"
  })
  const [UkeleleChordsData] = useState<any>(UkeleleChordData.chords);
  // const Chords = useSelector(state=> state.Chords)
  // const dispatch = useDispatch();
  let instrument = {
    strings: 4,
    fretsOnChord: 4,
    name: "Ukulele",
    keys: [],
    tunings: {
      standard: ["G", "C", "E", "A"]
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
    // console.log(selectedChord)



    let selectedChords = UkeleleChordsData[selectedChord.chord].filter((chord: any) => {
      if (chord.suffix === selectedChord.suffix) {
        return chord
      } else if (selectedChord.suffix === "all") {
        return chord
      }
    });
    setCurrentChords(selectedChords);

  }, [selectedChord, UkeleleChordsData])
  useEffect(() => {
    if (UkeleleChordsData) {

      setCurrentChords(UkeleleChordsData["C"]);
      // console.log(GuitarChordsData.chords)
    }

  }, [UkeleleChordsData]);
  const lite = false;
  return (
    <Layout>

    <div className="chord-container px-4" >
      <Link href={"/chords/guitar"}>Guitar Chords</Link>
      <div className="flex space-x-4">
        <div>

          <h1>Chord</h1>
          <select
            value={selectedChord.chord}
            onChange={handleChord}
            name={"chord"}
          >
            {
              UkeleleChordsData && Object.keys(UkeleleChordsData).map((key, ind) =>

                <option key={ind} value={key}>{key}</option>
              )
            }
          </select>
        </div>
        <div>
          <h1>suffix </h1>
          <select
            value={selectedChord.suffix}
            name={"suffix"}
            onChange={handleChord}
            >
            <option value="all">all </option>
            {
              UkeleleChordsData[selectedChord.chord].map((chord: any, ind: number) =>

                <option style={{ color: "black", backgroundColor: "var(--bg-color)" }} value={chord.suffix} key={ind}> {chord.suffix} </option>
              )
            }
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        
        {currentChords.length > 0 && currentChords.map((chord: any, ind: number) => {
          return (
            <div key={ind} className="">
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: ".3em"
              }}>
                <h3>{chord.key} {chord.suffix}</h3>
              </div>
              <div className="flex">

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
export default UkeleleChords;
