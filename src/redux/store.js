import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/mainSlice";

export const store = configureStore({
    reducer: {
        main: mainSlice,
    }
})