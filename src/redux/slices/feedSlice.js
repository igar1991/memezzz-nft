import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SwarmNFT from "swarm-nft/SwarmNFT.min";
import { Bee } from "@ethersphere/bee-js"
const { providers, Wallet } = require('ethers');



export const getJsonFeed = createAsyncThunk('feed/getJsonFeed',
    async function (_, { rejectWithValue }) {
        try {
            const bee = new Bee('https://bee-0.gateway.ethswarm.org');
            const provider = new providers.JsonRpcProvider('https://dai.poa.network');
            const signer = new Wallet('0cc7a2ca663b8ac0d502cc993590952f0b88408bd0009c0e2708b760602e9790', provider);
            const instance = new SwarmNFT(bee, provider, signer, {
                erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469'
            });
            let totalSupply = await instance.getTotalSupply();
            let meta = await instance.getMetaForIds(instance.createIdsList(totalSupply));
            return meta
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



export const getFeed = createAsyncThunk('feed/getFeed',
    async function (arr, { rejectWithValue }) {
        let arrNft = []
        try {

            for (let i = 0; i < arr.length; i++) {
                const response = await fetch(arr[i].metaUri)
                if (!response.ok) {
                    console.log("Server error")
                } else {
                    const data = await response.json()
                    arrNft.push(data)
                }
                
            }
            return arrNft;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const feedSlice = createSlice({
    name: "feed",
    initialState: {
        arrJson: [],
        arrNft: [],
        status: "start",
        error: null,
    },
    reducers: {
    },
    extraReducers: {
        [getJsonFeed.pending]: (state) => {
            state.status = "pending"
        },
        [getJsonFeed.fulfilled]: (state, action) => {
            state.arrJson = action.payload
        },
        [getJsonFeed.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
        [getFeed.pending]: (state) => {
            state.status = "pending"
        },
        [getFeed.fulfilled]: (state, action) => {
            state.status = "complit"
            state.arrNft = action.payload
        },
        [getFeed.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
    }
})

export default feedSlice.reducer