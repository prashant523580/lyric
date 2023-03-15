
import axiosInstance from "@/helpers/axios";
import { getSongLists } from "../reducers/songlist.reducer";
export const getAllSongLists = () => {

    return async (dispatch : any) =>{
 
        let res = await axiosInstance.get(`/api/songs`);
        let {songLists} = await res.data;
        // console.log(songLists)
        dispatch(getSongLists(songLists))
    }
}

export const getSongByArtists =({artist,song} : any) => {

    return async (dispatch: any) =>{

        // console.log({artist,song})
    }
}