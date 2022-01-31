import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTemplateArr = createAsyncThunk('main/getTemplateArr',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`https://api.imgflip.com/get_memes`)
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

export const mainSlice = createSlice({
    name: "main",
    initialState: {
        imgTemplate: [],
        status: "start",
        error: null,
        currentMeme: null,
        widthCanvas: null,
        heightCanvas: null,
        textOptions: [{
            id: 0,
            isDragging: false,
            x: 50,
            y: 50,
            fontsize: 40,
            text: '',
            fontcolor: '#000000'
        }]
    },
    reducers: {
      chooseMeme: (state, action)=>{
        state.currentMeme =action.payload
      },
      postWidth: (state, action)=>{
          state.widthCanvas=action.payload
      },
      postHeight: (state, action)=>{
        state.heightCanvas=action.payload
    },
     changeText: (state, action)=>{
         state.textOptions = action.payload
     }
    },
    extraReducers: {
        [getTemplateArr.pending]: (state) => {
            state.status = "load"
            console.log("Нyчалачь загрузка")
        },
        [getTemplateArr.fulfilled]: (state, action) => {
            state.status = "complit"
            state.imgTemplate = action.payload.data.memes
            console.log("загрузка закончена")
        },
        [getTemplateArr.rejected]: (state, action) => {
            state.status = "error"
            console.log("Errorrr")
            state.error = action.payload
        },
    }
})

export const {chooseMeme, postWidth, postHeight, changeText } = mainSlice.actions

export default mainSlice.reducer