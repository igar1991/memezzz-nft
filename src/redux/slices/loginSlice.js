import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const { providers } = require('ethers');

const url = 'http://localhost:3007'



export const getAdressMeta = createAsyncThunk('meta/getAdress',
    async function (_, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            
            const addresses = await provider.send("eth_requestAccounts", []);
            return addresses[0]
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getAdressWaves = createAsyncThunk('waves/getAdress',
    async function (adress, { rejectWithValue }) {
        const authData = { data: "MemeZzz" }
        try {
            const state = await window.WavesKeeper.auth(authData)
            return state
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getUserNftWaves = createAsyncThunk('waves/getUserNft',
    async function (adressWaves, { rejectWithValue }) {
        try {
            console.log('2222')
            const response = await fetch(`${url}/get-nft-user/${adressWaves}`)
            if (!response.ok) {
                throw new Error("Server error")

            }
            const data = await response.json()
            console.log(data)
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const loginSlice = createSlice({
    name: "meta",
    initialState: {
        nameBlockchain: null,
        modalMeta: false,
        networkId: null,
        userAdress: null,
        publicKey: null,
        userNft: null,
        status: "start",
        error: null,
    },
    reducers: {
        modalisMeta: (state, action)=>{
            state.modalMeta = action.payload
        },
        getNetwork: (state, action)=> {
            state.networkId=parseInt(action.payload)
        },
        logout: (state)=>{
            state.userAdress = null
            state.publicKey = null
            state.nameBlockchain=null
            state.networkId=null
            state.status = 'start'
            state.error = null
        }
    },
    extraReducers: {
        [getAdressMeta.pending]: (state) => {
            state.status = 'pending'
        },
        [getAdressMeta.fulfilled]: (state, action) => {
            state.userAdress = action.payload
            state.nameBlockchain = 'ethereum'
            state.status = 'login meta'
        },
        [getAdressMeta.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
        [getAdressWaves.pending]: (state) => {
            state.status = 'pending'
        },
        [getAdressWaves.fulfilled]: (state, action) => {
            state.userAdress = action.payload.address
            state.publicKey = action.payload.publicKey
            state.nameBlockchain = "waves"
            state.status = 'login waves'
        },
        [getAdressWaves.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
        [getUserNftWaves.pending]: (state) => {
            state.status = 'pending'
        },
        [getUserNftWaves.fulfilled]: (state, action) => {
            state.userNft = action.payload
            state.status = 'nft get'
        },
        [getUserNftWaves.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        }
    }
})

export const { getNetwork, modalisMeta, logout } = loginSlice.actions

export default loginSlice.reducer