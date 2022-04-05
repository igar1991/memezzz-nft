import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';
const { providers } = require('ethers');

const url = 'https://api-memez.testeron.pro'

const signer = new Signer({
    // Specify URL of the node on Testnet
    NODE_URL: 'https://nodes-testnet.wavesnodes.com',
});
  const keeper = new ProviderKeeper();
signer.setProvider(keeper)



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

export const pickupNftWaves = createAsyncThunk('waves/pickupNft',
    async function ({ id, id_asset }, { rejectWithValue }) {
        console.log(id_asset, id)
        try {
            const data = {
                dApp: '3N4bt53eU7kwBbhAkh2KFYajCc1kAtu9TY8',
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
        console.log(id, id_asset, isTradable, price)
        try {
            const data = {
                dApp: '3N4bt53eU7kwBbhAkh2KFYajCc1kAtu9TY8',
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
            console.log(item)
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
        modalisMeta: (state, action) => {
            state.modalMeta = action.payload
        },
        getNetwork: (state, action) => {
            state.networkId = parseInt(action.payload)
        },
        logout: (state) => {
            state.userAdress = null
            state.publicKey = null
            state.nameBlockchain = null
            state.networkId = null
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
            console.log('111111111111111111111111')
            state.userNft = state.userNft.map(item => item.id === action.payload.id ? action.payload : item)
        },
        [changeNftWaves.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { getNetwork, modalisMeta, logout } = loginSlice.actions

export default loginSlice.reducer