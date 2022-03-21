import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3007'

export const getNft = createAsyncThunk('admin/getNft',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${url}/get-nft-admin/`)
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

export const mintNftAdmin = createAsyncThunk('admin/mintNftAdmin',
    async function (id, { rejectWithValue }) {
        try {
            const dataBase = window.btoa(`nft_${id}`)
            window.WavesKeeper.signCustomData({
                version: 1,
                binary: dataBase
            })
                .then(async (encryptedMessage) => {
                    let form_data = new URLSearchParams();
                    const item = {
                        binary: encryptedMessage.binary,
                        publicKey: encryptedMessage.publicKey,
                        signature: encryptedMessage.signature
                    }
                    for (let key in item) {
                        form_data.append(key, item[key]);
                    }
                    const response = await fetch(`${url}/mint-nft-admin/${id}`, {
                        method: 'POST',
                        body: form_data,
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    return response.json();
                });
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

export const rejectNftAdmin = createAsyncThunk('admin/rejectNftAdmin',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`${url}/reject-nft-admin/${id}`)
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

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        allNft: null,
        status: "start",
        statusMint: "On modaration",
        error: null,
    },
    reducers: {
    },
    extraReducers: {
        [getNft.pending]: (state) => {
            state.status = "load"
            console.log("Нyчалачь загрузка")
        },
        [getNft.fulfilled]: (state, action) => {
            state.status = "complit"
            state.allNft = action.payload
            console.log("загрузка закончена")
        },
        [getNft.rejected]: (state, action) => {
            state.status = "error"
            console.log("Errorrr")
            state.error = action.payload
        },
        [mintNftAdmin.pending]: (state) => {
            state.status = "load"
            console.log("Нyчалачь загрузка")
        },
        [mintNftAdmin.fulfilled]: (state, action) => {
            state.status = "complit"
            state.statusMint = action.payload
            console.log("загрузка закончена")
        },
        [mintNftAdmin.rejected]: (state, action) => {
            state.status = "error"
            console.log("Errorrr")
            state.error = action.payload
        },
        [rejectNftAdmin.pending]: (state) => {
            state.status = "load"
            console.log("Нyчалачь загрузка")
        },
        [rejectNftAdmin.fulfilled]: (state, action) => {
            state.status = "complit"
            //state.statusMint = action.payload
            console.log("загрузка закончена")
        },
        [rejectNftAdmin.rejected]: (state, action) => {
            state.status = "error"
            console.log("Errorrr")
            state.error = action.payload
        },
    }
})

//export const {} = mainSlice.actions

export default adminSlice.reducer