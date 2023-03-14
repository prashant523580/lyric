import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

const initialState : any ={
    songLists:[]
};

const  songListSlices = createSlice({
    name:"songList",
    initialState,
    reducers:{
        getSongLists(state,action:PayloadAction<any>){
            // console.log(action.payload)
            state.songLists = action.payload
            //  action.payload.map((item : any) => {
            //     if(!state.includes(item)){

            //         state.push(item)
            //     }
            //  })

        }
    }
})

export const {getSongLists} = songListSlices.actions;
export default songListSlices.reducer;