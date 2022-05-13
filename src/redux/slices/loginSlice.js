import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';
const { providers } = require('ethers');

const url = process.env.REACT_APP_API_LINK;

const signer = new Signer({
    NODE_URL: process.env.REACT_APP_WAVES_NODE_URL,
});

if(window.WavesKeeper) {
    const keeper = new ProviderKeeper();
    signer.setProvider(keeper)
  
}


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
    async function (_, { rejectWithValue, dispatch }) {
        const authData = { data: "MemeZzz" }
        try {
            const state = await window.WavesKeeper.auth(authData);
            const item = await window.WavesKeeper.publicState();
            dispatch(updateWavesState(item))
            return state
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getWavesState = createAsyncThunk('waves/getWavesState',
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const state = await window.WavesKeeper.publicState();
            window.WavesKeeper.on('update', (item) => {
                dispatch(updateWavesState(item))
            })
            return state;

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getUserNftWaves = createAsyncThunk('waves/getUserNft',
    async function (adressWaves, { rejectWithValue }) {
        try {
            const response = await fetch(`${url}/get-nft-user/${adressWaves}`)
            if (!response.ok) {
                throw new Error("Server error")

            }
            const data = await response.json()
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const pickupNftWaves = createAsyncThunk('waves/pickupNft',
    async function ({ id, id_asset }, { rejectWithValue }) {
        try {
            const data = {
                dApp: process.env.REACT_APP_WAVES_DAPP_ADRESS,
                fee: 500000,
                chainId: 84,
                call: {
                    function: 'pickUp',
                    args: [
                        { type: 'string', value: id_asset },
                    ],
                },
            }
            const [tx] = await signer
                .invoke(data)
                .broadcast();

            const response = await fetch(`${url}/pickup-nft/${id}`)
            if (!response.ok) {
                throw new Error("Server error")

            }
            const iddata = await response.json()
            return iddata;

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const changeNftWaves = createAsyncThunk('waves/changeNft',
    async function ({ id, id_asset, isTradable, price }, { rejectWithValue }) {
        try {
            const data = {
                dApp: process.env.REACT_APP_WAVES_DAPP_ADRESS,
                fee: 500000,
                chainId: 84,
                call: {
                    function: 'setTokenInfo',
                    args: [
                        { type: 'string', value: id_asset },
                        { type: 'boolean', value: isTradable },
                        { type: 'integer', value: (+price*100000000).toFixed(0) },

                    ],
                },
            }
            const [tx] = await signer
                .invoke(data)
                .broadcast();
            let form_data = new URLSearchParams();
            const item = {
                price: price,
                public: isTradable ? '1' : '0',
            }
            for (let key in item) {
                form_data.append(key, item[key]);
            }
            const res = await fetch(`${url}/change-nft/${id}`, {
                method: 'POST',
                body: form_data,
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            const response = await fetch(`${url}/get-nft/${id}`)
            const update = await response.json()

            return update[0]

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const loginSlice = createSlice({
    name: "waves",
    initialState: {
        nameBlockchain: "waves",
        chainId: null,
        modalMeta: false,
        networkId: null,
        userAdress: null,
        publicKey: null,
        userNft: null,
        status: "start",
        error: null,
    },
    reducers: {
        modalisMeta: (state, action) => {
            state.modalMeta = action.payload
        },
        getNetwork: (state, action) => {
            state.networkId = parseInt(action.payload)
        },
        logout: (state) => {
            state.userAdress = null
            state.publicKey = null
            state.chainId = null
            state.status = 'start'
            state.error = null
        },
        updateWavesState: (state, action)=>{
            state.userAdress = action.payload.account.address;
            state.chainId = action.payload.account.networkCode;
            state.publicKey = action.payload.account.publicKey;
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
        },
        [pickupNftWaves.pending]: (state) => {
            console.log('start')
        },
        [pickupNftWaves.fulfilled]: (state, action) => {
            state.status = 'get'
            state.userNft = state.userNft.filter(item => item.id !== action.payload)
        },
        [pickupNftWaves.rejected]: (state, action) => {
            state.error = action.payload
        },
        [changeNftWaves.pending]: (state) => {
            console.log('starttttttttttt')
        },
        [changeNftWaves.fulfilled]: (state, action) => {
            state.userNft = state.userNft.map(item => item.id === action.payload.id ? action.payload : item)
        },
        [changeNftWaves.rejected]: (state, action) => {
            state.error = action.payload
        },
        [getWavesState.pending]: (state) => {
        },
        [getWavesState.fulfilled]: (state, action) => {
            state.userAdress = action.payload?.account.address;
            state.chainId = action.payload?.account.networkCode;
            state.publicKey = action.payload?.account.publicKey;
        },
        [getWavesState.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { getNetwork, modalisMeta, logout, updateWavesState } = loginSlice.actions

export default loginSlice.reducer