import { configureStore } from "@reduxjs/toolkit";
import feedSlice from "./slices/feedSlice";
import mainSlice from "./slices/mainSlice";
import metaSlice from "./slices/metaSlice";
import nftSlice from "./slices/nftSlice";

export const store = configureStore({
    reducer: {
        main: mainSlice,
        feed: feedSlice,
        meta: metaSlice,
        nft: nftSlice
    }
})