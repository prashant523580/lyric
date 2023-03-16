import * as React from "react";
import GuitarChordData from "@tombatossals/chords-db/lib/guitar.json";
import Chord from "@tombatossals/react-chords/lib/Chord";
import "./style.scss"
import { useDispatch,useSelector } from "react-redux";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import parse from "html-react-parser";
// import { useLocation } from "react-router-dom";
import { Box, Button, Modal, Fade, Backdrop, Slider } from "@mui/material";
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import NavigateLayout from "../../../components/back-button/Back";
// import Fade from '@mui/material/Fade';
// import Backdrop from '@mui/material/Backdrop';
// import GuitarTab from "./GuitarTab";
import Typography from '@mui/material/Typography';
import { bindActionCreators } from "redux";
// import { ChordsActionCreator, LyricChordActionCreator } from "../../../redux/actions/index.action";
// import {State} from "../../../redux/reducers/index.reducer";
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "400",
	height: "70vh",
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: "0px 6px 8px rgba(0,0,0,0.6)",
	display: "flex",
	flexDirection: "column",
	borderRadius: "4px",
	outline: "none"
}
interface  ChordsTypes {
	key: string,
	suffix:string,
	positions: Array<object>
}
interface OptionsTypes{
	play: boolean,
	speed: number,
	transpose: number,
	results: string,
	scales: Array<string>,
	fontSize: number
}
interface InstrumentTypes{
	strings: number;
	fretsOnChord: number;
	name: string;
	keys: Array<string>;
	tunings: object
}
interface ChordSuffixTypes {
	chord: string,
	suffix:string
}
interface ChordsKeyTypes {
	A : object,
	Ab: object,
	B : object,
	Bb: object,
	C : object,
	D : object,
	Db: object,
	E : object,
	Eb : object,
	F : object,
	G : object,
	Gb : object
}
const ChordLyricPage : React.FC = () =>  {
	const dispatch = useDispatch();
	// const  {GetAllGuitarChords} = bindActionCreators(ChordsActionCreator,dispatch);
	// const {songLyricChord} = bindActionCreators(LyricChordActionCreator,dispatch);
	// const guitarChordsData = useSelector((state : State )=> state.Chords);
	// const song = useSelector((state: State) => state.artistSongs.song);
	React.useEffect(() => {
			// GetAllGuitarChords();
			// songLyricChord(location.pathname.substring(location.pathname.lastIndexOf("/") + 1))
	},[dispatch]);
	
	// const location : any = useLocation();
	// const { state } = location;
	const [isOptions, setIsOptions] = React.useState<boolean>(false);
	const [isShowChords, setIsShowChords] = React.useState<boolean>(false);
	// const [isOpacity, setIsOpacity] = React.useState(false);
	// const [currentChord, setCurrentChord] = React.useState(null);
	const [lyricChord,setLyricChords] = React.useState<any>();
	const [songChords,setSongChords] = React.useState<any>();
	const [step, setStep] = React.useState(0);
	const [chordDisplay, setChordDisplay] = React.useState(songChords);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [chordSuffix, setChordSuffix] = React.useState<any>([]);
	const [transDisChord, setTransDisChord] = React.useState<any>([]);
	const [currentChordPositions, setCurrentChordPositions] = React.useState();
	// const [isTabPlayer,setIsTabPlayer] = React.useState(false);
	// const [layoutColor, setLayoutColor] = React.useState();
	const Chords = GuitarChordData.chords;
	// const Chords : any = guitarChordsData.guitar.chords;
	let instrument : InstrumentTypes = {
		strings: 6,
		fretsOnChord: 5,
		name: "Guitar",
		keys: [],

		tunings: {
			standard: ["E", 'A', 'D', 'G', 'B', 'E']
		}
	};



	// const [songDetails, setSongDetails] = React.useState({
	// 	strum: state.strum,
	// 	beat: state.beat,
	// 	tempo: state.tempo,
	// 	key: state.key,
	// })

	const [options, setOptions] = React.useState<OptionsTypes	>({
		play: false,
		speed: .6,
		transpose: 0,
		results: "",
		scales: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
		fontSize: 15
	})
	const ref   = React.useRef<HTMLDivElement>(null);
	const optionRef  = React.useRef<HTMLDivElement>(null);
	const intervalId  = React.useRef<NodeJS.Timeout | null | string | undefined>(null);
	const lyricChordRef = React.useRef<HTMLDivElement>(null);
	const pageEndRef = React.useRef<HTMLDivElement>(null);
	const songInfoRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		if(song){

			setLyricChords(song.lyricChord);
			setSongChords(song.chords);
			setChordDisplay(songChords)
		console.log(song)
		}
		// console.log(chordDisplay,chordSuffix)
	})
	React.useEffect(() => {
		// console.log(lyricChord,songChords)
	},[])
	const generateChordLyric = (str : string) => {
		let replaceStr = str.replace(/\[(.*?)\]/g, "<span> $1</span>")
		replaceStr = replaceStr.replace(/,/g, "<br/>")
		return replaceStr
	}
	const transposeChord = (chord:string, amount : number) => {
		// console.log(typeof(chord), typeof(amount))
		var normalizeMap : any = { "Cb": "B", "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#", "E#": "F", "B#": "C" }
		return chord.replace(/[CDEFGAB](#|b|sharp)?/g,
			function (match) {
				// console.log(match)
				var i = (options.scales.indexOf(normalizeMap[match] ? normalizeMap[match] : match) + amount) % options.scales.length;
				// console.log(options.scales[i + options.scales.length])
				return options.scales[i < 0 ? i + options.scales.length : i];
			}
		);
	}
	const toggleOptions = () => {
		isOptions === true ? setIsOptions(false) : setIsOptions(true)
	}
	const updateTranspose = (n : number) => {
		if (n === 1) {
			setStep(step + n)
			if (step === 11) {
				setStep(0)
			}
		} else if (n === -1) {

			setStep(step + n)
			if (step === -11) {
				setStep(0)
			}
		}
		let elements  = ref.current?.children as HTMLCollection;
		// console.log(elements)
		Array.from(elements).forEach((span : Element , ind:number ) : void => {
			if (span.nodeName === "SPAN") {
				//alert(transposeChord(span.innerText,2))
				let chordName = elements[ind] as HTMLElement;
				let currentChord = chordName?.innerText;
				currentChord.charAt(0).toUpperCase();
				span.innerHTML = transposeChord(currentChord, n)
			}
		})
		let chordsTODisplay =  chordDisplay.map(({chord,suffix} : ChordSuffixTypes) => {
			return ({
				chord: transposeChord(chord, n),
				suffix: suffix
			})
		})
		setChordDisplay(chordsTODisplay);
	}
	
	const handleOpacity = () => {
		// setIsOpacity(false)
	}
	const handleControls = () => {
		if (options.play === true) {
			setOptions(pre => {
				return { ...pre, play: false }
			})
			setIsOptions(true);

		} else {
			setOptions(pre => {
				return { ...pre, play: true }
			})
			setIsOptions(false);
		}
	}
	React.useEffect(() => {
		if (options.play === true) {
			startScroll();
		} else {
			stopScroll();
		}
			if(ref.current !== null){

				ref.current.addEventListener("touchstart", stopScroll);
				ref.current.addEventListener("touchend", startScroll) 
			}

	}, [options.play])
	function startScroll() {
		(options.play === true) ? intervalId.current = setInterval(scrollToBottom, 150) : intervalId.current !== null && clearInterval(intervalId.current);
	}
	function stopScroll() {
		intervalId.current !== null && clearInterval(intervalId.current);
	}
	function scrollToBottom() {

		let scrollTop  = document.scrollingElement!.scrollTop;
		let currentScroll = document.scrollingElement!.clientHeight + scrollTop;
		let scrollHeight = document.scrollingElement!.scrollHeight;
		if (currentScroll >= scrollHeight) {
			if(intervalId.current !== null) clearInterval(intervalId.current);
			setOptions(pre => {
				return {
					...pre, play: false
				}
			})
			return
		}
		window.scrollBy({ left: 0, top: options.speed, behavior: "smooth" });
		// if(options.play === false){
		// 	clearInterval(intervalId.current)
		// }
	}


	React.useEffect(() => {
		//  console.log(transDisChord)
		// console.log(currentChordDis)
		let suffixChord = chordDisplay && chordDisplay.map((chord : ChordSuffixTypes) => {
			if (chord.chord === "A#") {
				chord.chord = "Bb"
			} else if (chord.chord === "D#") {
				chord.chord = "Eb"
			} else if (chord.chord === "G#") {
				chord.chord = "Ab"
			} else if (chord.chord === "B") {
				chord.chord = "B"
			} else if (chord.chord === "A") {
				chord.chord = "A"
			} else if (chord.chord === "C") {
				chord.chord = "C"
			} else if (chord.chord === "D") {
				chord.chord = "D"
			} else if (chord.chord === "G") {
				chord.chord = "G"
			} else if (chord.chord === "E") {
				chord.chord = "E"
			} else if (chord.chord === "F") {
				chord.chord = "F"
			} else {
				// chord.chord = chord.chord
			}

			return chord
		})
		setChordSuffix(suffixChord)

	}, [chordDisplay])
	React.useEffect(() => {
		if (chordSuffix) {
			let chordsItem : any = [];
			Object.keys(Chords).map((key: string) => {
				Chords[key].filter((chord : ChordsTypes) => {
					chordSuffix.map((item : ChordSuffixTypes) => {
						if (item.chord === chord.key && item.suffix === chord.suffix) {
							chordsItem.push(chord)
						}
					})
				})
			})
			setTransDisChord(chordsItem)
		}
	}, [chordSuffix, Chords])
	const lite = false;
	const RenderGuitarChord = (props ) => {
		const chordPositions : ChordsTypes = props.positions;
		return (

			<Modal
				open={open}
				onClose={handleClose}
				//aria-labelledby="modal-modal-title"
				//aria-describedby="modal-modal-description"
				sx={{
					textAlign: "center"
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography>{chordPositions.key}{chordPositions.suffix}</Typography>
						<div className="chordPositions" style={{
							overflowY: "auto",
							display: "grid",
							justifyContent: "center",
							alignItems: "center",
							grid: "auto auto/ auto auto",
							gridGap: "5px",
							width: window.innerWidth > 700 ? 450 : 350,
							height: 420
						}}>

							{
								chordPositions.positions.map((pos : any, ind : number) => {
									return (
										<div key={ind}>

											<Chord className="svg" key={ind} lite={lite} instrument={instrument} chord={pos} />
										</div>
									)
								})
							}
						</div>
					</Box>
				</Fade>
			</Modal>
		);
	}

	React.useEffect(() => {
		document.addEventListener("visibilitychange", () => {
			if (document["hidden"]) {
				intervalId.current !== null && clearInterval(intervalId.current);
				setOptions(pre => {
					return { ...pre, play: false }
				})

			}

		})
		return () => {
			intervalId.current !== null && clearInterval(intervalId.current)
		}
	}, [intervalId])
	const handleScrollSpeed = (e : React.SyntheticEvent) => {
		//scrollToBottom()
		//startScroll()
		let value = (e.target as HTMLInputElement).value;
		setOptions(pre => {
			return {
				...pre, speed: Number(value),
				play: false
			}
		})
		intervalId.current !== null && clearInterval(intervalId.current)
	}
	const handleFontSize = (e : React.SyntheticEvent) : void => {
		let value = (e.target as HTMLInputElement).value
		setOptions(pre => {
			return {
				...pre, fontSize: Number(value)
			}
		})
	}
	const handelChords = () => {
		isShowChords === true ? setIsShowChords(false) : setIsShowChords(true)
	}
	// const selectLayoutColor = (layout) => {

	// setLayoutColor(layout)
	// }
	const handleGuitarPlayer = () => {
		// isTabPlayer === true ? setIsTabPlayer(false) : setIsTabPlayer(true)
	}
	// useEffect(() => {
	// 	// console.log(layoutColor)
	// 	if(layoutColor){												


	// 	// document.body.style.background = layoutColor.background;
	// 	ref.current.style.color = layoutColor.foreground;
	// 	ref.current.style.background = layoutColor.background;
	// 	}		
	// },[layoutColor])
	// const selectColor = (e) => {
	// console.log(e.target.value)
	// setLayoutColor({
	// 	background: e.target.value,
	// 	foreground: "white" 
	// })
	// }



	React.useEffect(() => {
		if(ref.current){

			ref.current.style.fontSize = options.fontSize + "px";
		}
	}, [options.fontSize])
//toggle options
// React.useState(() => {

// 	window.addEventListener("keypress",(e) =>{
// 		console.log(e.key)
// 		if(e.key === "t"){	 
// 			if(isOptions === true){
// 				setIsOptions(false)				
// 			}else if(isOptions === false){
// 				setIsOptions(true)
			
// 			}
// 		}
// 		else if(e.key === "p"){
// 			if(options.play === true){

// 					setOptions(pre => {
// 			return {
// 					...pre, 
// 					play: false
// 				  }
// 				})
// 			}else{
// 					setOptions(pre => {
// 			return {
// 					...pre, 
// 					play: true
// 				  }
// 				})
// 			}
// 		}
// 	})
// },[isOptions])

	return (
		<NavigateLayout >
			<div id={"lyricChord"} ref={lyricChordRef} className={"lyricChordContainer"}>
				<div className={"header"}>
					<div className="addToFav" style={{
						float: "right"
					}}>

					</div>
					<div className="song-details">
						<div className={"song-info"} ref={songInfoRef}>
							{
								song &&
								<>
								<h4>Song: {song.songname} </h4>
							<p>Beat: {song.beat} </p>
							{/* <p>Strumming: {parse(song.strum)} </p> */}
							<p>Tempo: {song.tempo} </p>
							<p>key:{song.key} </p>
								</>
						}
						</div>

						<Button onClick={handelChords} sx={{
							color: "var(--light-green)"
						}}>
							{isShowChords ? "hide chord" : 'show chord'}
						</Button>
						{/* <Button onClick={handleGuitarPlayer}>{ !isTabPlayer ? "tab player" : "chord player"}</Button> */}
						{
							currentChordPositions && <RenderGuitarChord positions={currentChordPositions} />
						}
						<div className={`songchords ${isShowChords === true ? "show-chord" : "hide-chord"}`}>
							{
								transDisChord &&
								transDisChord.map((chord:any, ind:number) => {
									return (
										<div key={ind}
											className={`chord`}
											onClick={() => {
												// RenderGuitarChord(chord);
												handleOpen()
												setCurrentChordPositions(chord)
											}}>
											<div> {chord.key} {chord.suffix}</div>
											<Chord chord={chord.positions[0]} instrument={instrument} />
										</div>
									)
								})

							}
						</div>
					</div>

					<div className={"options"} ref={optionRef}
					>
						<Button sx={{
							position: "fixed",
							right: "1em",
							top: ".3em",
							zIndex: "99999",
							color: "var(--white)",
							minWidth: "30px",

						}} onClick={toggleOptions}><SettingsIcon /> </Button>
						<div className={`option-content ${isOptions === true ? "show-option" : "hide-option"}`} onClick={handleOpacity}
							style={{

								background: "url(/images/img/wood-wall-textures.jpg)"
							}}>
							<div
								style={{
									display: "flex"
								}}
							>

								<div className={"transpose"}>
									<div onClick={handleControls}>

										<Button> {options.play === true ? <PauseIcon /> : <PlayArrowIcon />}  </Button>


									</div>

									<input type="range" value={options.speed} step={".1"} min={".6"} max={"4"} onChange={handleScrollSpeed} />
								</div>
								<div style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-around",
									//	backgroundColor:"white",
									textTransform: "capitalize",
								}}>
									<Button onClick={() => updateTranspose(-1)} className={"minus"} > - </Button>
									<p style={{ color: "var(--white)" }}>transpose({step})</p>
									<Button onClick={() => updateTranspose(1)} className={"plus"}> + </Button>
								</div>

							</div>
							<div className="layout-color-content">
								{

									// <input type="color" onChange={selectColor} />
									// layout.map((layout, ind) => {
									// 	return (
									// 		<div className="layout-color" key={ind} style={{
									// 		 background: layout.background,
									// 		 color: layout.foreground,
									// 		 margin: "0 .3em",
									// 		 padding: ".6em .3em"
									// 		}} onClick={() => selectLayoutColor(layout)}>
									// 			<label htmlFor={layout.label}>
									// 				{layout.label}
									// 			</label>
									// 		</div>
									// 	)
									// })
								}
							</div>
							<div className="font-control"
								style={{
									color: "white"
								}}
							>
								<span>Text Size: </span>
								<input step={".2"} min={"9"} max={"30"} type="range" onChange={handleFontSize} value={options.fontSize} />
							</div>
						</div>

					</div>
				</div>
				<hr />
				<div ref={ref} className={"lyricChord"}>
					{	
						lyricChord && 
						parse(generateChordLyric(lyricChord))
					}
				</div>

				<div ref={pageEndRef} />
			</div>
		</NavigateLayout>
	)
}

export default ChordLyricPage;
