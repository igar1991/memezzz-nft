import { configureStore } from "@reduxjs/toolkit";
import feedSlice from "./slices/feedSlice";
import mainSlice from "./slices/mainSlice";
import loginSlice from "./slices/loginSlice";
import nftSlice from "./slices/nftSlice";
import adminSlice from "./slices/adminSlice";
import onenftSlice from "./slices/onenftSlice";

export const store = configureStore({
    reducer: {
        main: mainSlice,
        feed: feedSlice,
        login: loginSlice,
        nft: nftSlice,
        admin: adminSlice,
        onenft: onenftSlice
    }
})