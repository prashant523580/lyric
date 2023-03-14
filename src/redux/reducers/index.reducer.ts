import {combineReducers} from "redux"
import songlistReducer from "./songlist.reducer"

const rootReducers = combineReducers({
    songs: songlistReducer
})

export default rootReducers