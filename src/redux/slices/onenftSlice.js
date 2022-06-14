import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = process.env.REACT_APP_API_LINK;

export const getOneNft = createAsyncThunk('onenft/getOneNft',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`${url}/get-nft/${id}`)
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
        updateDataAfterBuy: (state, action)=> {
            state.nftData = {...state.nftData, price: action.payload.price, owner: action.payload.owner };
        }
    },
    extraReducers: {
        [getOneNft.pending]: (state) => {
            state.status = "load"
        },
        [getOneNft.fulfilled]: (state, action) => {
            state.status = "complit"
            state.nftData = action.payload
        },
        [getOneNft.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        }
    }
})

export const { updateDataAfterBuy } = onenftSlice.actions

export default onenftSlice.reducer