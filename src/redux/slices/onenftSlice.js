import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//const url = 'http://localhost:3007'
const url = 'https://api-memez.testeron.pro'

export const getOneNft = createAsyncThunk('onenft/getOneNft',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`${url}/get-nft/${id}`)
            console.log(response)
            if (!response.ok) {
                throw new Error("Server error")

            }
            const data = await response.json()
            return data[0];

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

export const onenftSlice = createSlice({
    name: "onenft",
    initialState: {
        nftData: null,
        status: "start",
        error: null,
    },
    reducers: {
    },
    extraReducers: {
        [getOneNft.pending]: (state) => {
            state.status = "load"
            console.log("Нyчалачь загрузка")
        },
        [getOneNft.fulfilled]: (state, action) => {
            state.status = "complit"
            state.nftData = action.payload
            console.log("загрузка закончена")
        },
        [getOneNft.rejected]: (state, action) => {
            state.status = "error"
            console.log("Errorrr")
            state.error = action.payload
        },

    }
})

//export const {} = mainSlice.actions

export default onenftSlice.reducer