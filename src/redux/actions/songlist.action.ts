
// import axiosInstance from "@/helpers/axios";
import { getSongLists } from "../reducers/songlist.reducer";

const songLists = [
    {
        "artist": "1974AD",
        "songname": "Parelima",
        "lyricChord": '[E] Pare[F#m]lima  [Asus2]lukai &nbsp; &nbsp;[E]raakha na, [E] anga[F#m]loma [Asus2]bandhi [E]raakha, [E] Pare[F#m]lima  [Asus2]lukai &nbsp; &nbsp;[E]raakha na, [E] anga[F#m]loma [Asus2]bandhi [E]raakha,,[E] Jaana [F#m]nadeu  [Asus2] &nbsp;roka [E]na rokha, [E] Udna[F#m] nadeu [Asus2] aakash ko chari jastai  [E]malai,,, [C#m] Bandhera raakha timrai [B]mutuma, [C#m] yo ta timrai dhadhkana h[B]o, [C#m] Saachera raakha timrai [B]aakhama, [A] yo ta timrai sahara h[B]o,,, [E] mana [F#m]bhitra  [Asus2]saanchi &nbsp; &nbsp;[E]raakha na, [E] aakha[F#m]bhitra [Asus2]aljhai [E]raakha,[E] mana [F#m]bhitra  [Asus2]saanchi &nbsp; &nbsp;[E]raakha na, [E] aakha[F#m]bhitra [Asus2]aljhai [E]raakha,,[E]ramna [F#m]deu na  [Asus2] &nbsp;timrai [E]aankha ma, [E] baas[F#m] basna deu [Asus2] timro hridaya ko dhukdhu[E]ki ma,,, [C#m] Bandhera rakha timrai [B]mutuma, [C#m] yo ta timrai dhadhkana h[B]o, [C#m] Saachera rakha timrai [B]aakhama, [A] yo ta timrai sahara h[B]o,,, [E] Pare[F#m]lima  [Asus2]lukai &nbsp; &nbsp;[E]raakha na, [E] anga[F#m]loma [Asus2]bandhi [E]raakha, [E] Pare[F#m]lima  [Asus2]lukai &nbsp; &nbsp;[E]raakha na, [E] anga[F#m]loma [Asus2]bandhi [E]raakha,,',
        "beat": "4/4",
        "tempo": "93bpm",
        "key": "E major",
        "strum": "D &nbsp;PD&nbsp; -U&nbsp; P",
        "chords": [
            { "chord": "E", "suffix": "major" },
            { "chord": "F#", "suffix": "minor" },
            { "chord": "A", "suffix": "sus2" },
            { "chord": "C#", "suffix": "minor" },
            { "chord": "B", "suffix": "major" }
        ]
    },
    {
        "artist": "1974AD",
        "songname": "chudaina timro mayale",
        "lyricChord": "[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,samma [F] metinna [G]mera manaka [C]&nbsp; trishanaharu,yadi timi [G]najik navaye [E]Samma, betha [Dm]bardchha chota [G]pani ajhai tha[E]pinchha, [Am]&nbsp;jhan jhan mu[E]tuma [G]&nbsp; aago dank[D]inchha, [F]&nbsp; nabaljheko [C]ghau baljhin[G]chha,,,, bha[Am]nana ma[E]lai [C]&nbsp; timro the[G]gana,ba[Am]taunama[E]lai [C]&nbsp;timro cha[G]hana, mann pa[Dm]reka sa[F]bai ku[G]raha[C]ru, chit[E]thima nai sandhai lekhinou bhane, [Am]&nbsp;jhan jhan mu[E]tuma [G]&nbsp; aago dank[D]inchha, [F]&nbsp; nabaljheko [C]ghau baljhin[G]chha,,,[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,[Am]chudaina timro [F]mayale,[G]yedi timi nai yahan [Am]nabhaya,samma [F] metinna [G]mera manaka [C]&nbsp; trishanaharu,yadi timi [G]najik navaye [E]Samma, betha [Dm]bardchha chota [G]pani ajhai tha[E]pinchha, [Am]&nbsp;jhan jhan mu[E]tuma [G]&nbsp; aago dank[D]inchha, [F]&nbsp; nabaljheko [C]ghau baljhin[G]chha",
        "beat": "4/4",
        "tempo": "157bpm",
        "key": "A minor",
        "strum": "D &nbsp;D&nbsp;UUD&nbsp; DUP",
        "chords": [
            { "chord": "A", "suffix": "minor" },
            { "chord": "F", "suffix": "major" },
            { "chord": "G", "suffix": "major" },
            { "chord": "C", "suffix": "major" },
            { "chord": "E", "suffix": "major" },
            { "chord": "D", "suffix": "minor" }
        ]
    },
    {
        "artist": "Aastha",
        "songname": "Harpal Tyo Timrai",
        "lyricChord": '[g]&nbsp;harpal tyo timrai muska[em]ko, yaada le[c] satauchha ane pi[d]rolchha malae,[g]nashalu ti timro tyo ka[em]alo kesh le, mero [c]bhoka pyaasha sabai lu[d]tyo oh ho \n [g]&nbsp;padne belama pan[em]ii ma \n kina h[c]o yesari sadhain to[d]lai rahanchu',
        "beat": "4/4",
        "tempo": "109bpm",
        "key": "G major",
        "strum": "D &nbsp;DU&nbsp; -U&nbsp; DU",
        "chords": [
            { "chord": "G", "suffix": "major" },
            { "chord": "E", "suffix": "minor" },
            { "chord": "C", "suffix": "major" },
            { "chord": "D", "suffix": "major" },]
    },
    {
        "artist": "ugesh limbu",
        "songname": "Hamro Geet",
        "lyricChord": '[C]Sochchu aaja ma prash[G]na, \n' +
            '[Dm]Kina ho laddai [F]chhu ma aafai bhitra[C],\n',
        "beat": "4/4",
        "tempo": "109bpm",
        "key": "G major",
        "strum": "D &nbsp;DU&nbsp; -U&nbsp; DU",
        "chords": [
            { "chord": "C", "quality": "major" },
            { "chord": "G", "quality": "minor" },
            { "chord": "A", "quality": "sus2" },
            { "chord": "C#", "quality": "minor" },
            { "chord": "B", "quality": "major" }]
    },
]
export const getAllSongLists = () => {

    return async (dispatch : any) =>{
 
        // let res = await axiosInstance.get(`/api/songs`);
        // const res = await fetch("/api/songs",{
        //         method:"GET",
        //         headers:{
        //             "Content-Type":"application/json"
        //         }
        // })  
        // let {songLists} = await res.json();
        // console.log(songLists)
        dispatch(getSongLists(songLists))
    }
}

export const getSongByArtists =({artist,song} : any) => {

    return async (dispatch: any) =>{

        // console.log({artist,song})
    }
}