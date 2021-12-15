import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SwarmNFT from "swarm-nft/SwarmNFT.min";
import { Bee } from "@ethersphere/bee-js"
const { providers } = require('ethers');

const bee = new Bee('https://bee-0.gateway.ethswarm.org');



export const uploadNft = createAsyncThunk('nft/uploadNft',
    async function ({ image, title, dec }, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            const instance = new SwarmNFT(bee, provider, signer, {
                erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469'
            });
            instance.setGatewayPostageBatchId();
            const result = await instance.uploadNFT(image, '.jpg', {
                title: title,
                description: dec
            });

            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getUserMemes = createAsyncThunk('nft/getJsonFeed',
    async function (ad, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            const instance = new SwarmNFT(bee, provider, signer, {
                erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469'
            });
            let data = await instance.getUserTokens(ad);
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const createNft = createAsyncThunk('nft/createNft',
    async function ({ ad, metaData }, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            const instance = new SwarmNFT(bee, provider, signer, {
                erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469'
            });
            const nftResult = await instance.mintNFT(ad, metaData);
            await nftResult.wait();
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const nftSlice = createSlice({
    name: "nft",
    initialState: {
        modalNft: false,
        metaUrl: null,
        status: "start",
        statusUpload: "start",
        statusUser: "start",
        error: null,
        userMemes: null
    },
    reducers: {
        openModalNft: (state, action) => {
            state.modalNft = action.payload
        },
        clearMeta: (state) => {
            state.metaUrl = null
        }
    },
    extraReducers: {
        [uploadNft.pending]: (state) => {
            state.statusUpload = "pending"
        },
        [uploadNft.fulfilled]: (state, action) => {
            state.metaUrl = action.payload
            state.statusUpload = "start"
        },
        [uploadNft.rejected]: (state, action) => {
            state.statusUpload = "error"
            state.error = action.payload
        },
        [createNft.pending]: (state) => {
            state.status = 'pending'
        },
        [createNft.fulfilled]: (state, action) => {
            state.metaUrl = action.payload
            state.status = "created"
        },
        [createNft.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
        [getUserMemes.pending]: (state) => {
            state.statusUser = 'pending'
        },
        [getUserMemes.fulfilled]: (state, action) => {
            const newarr = action.payload.map((el) => el.meta)
            state.userMemes = newarr
            state.statusUser = "complit"
        },
        [getUserMemes.rejected]: (state, action) => {
            state.statusUser = "error"
            state.error = action.payload
        }
    }
})

export const { clearMeta, openModalNft } = nftSlice.actions

export default nftSlice.reducer