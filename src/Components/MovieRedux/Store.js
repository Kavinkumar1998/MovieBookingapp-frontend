import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slice";


export const store = configureStore({
    reducer:{
        movies:movieReducer
    }
})