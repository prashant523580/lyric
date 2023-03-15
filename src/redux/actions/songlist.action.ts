
import axiosInstance from "@/helpers/axios";
import { getSongLists } from "../reducers/songlist.reducer";
export const getAllSongLists = () => {

    return async (dispatch : any) =>{
          let dev = process.env.NODE_ENV !== "production";
            let {DEV_URL,PROD_URL} = process.env;

  // let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
  console.log(DEV_URL)
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