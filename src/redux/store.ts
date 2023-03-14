import { configureStore } from "@reduxjs/toolkit";
import { useSelector ,TypedUseSelectorHook} from "react-redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index.reducer";



const store = configureStore({
    reducer:rootReducers,
    middleware: [thunk]
})

export const AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducers>;
export const  useAppSelector : TypedUseSelectorHook<RootState> = useSelector ;
export default store;