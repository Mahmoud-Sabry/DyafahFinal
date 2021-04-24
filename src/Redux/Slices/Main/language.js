import { createSlice, createAction } from '@reduxjs/toolkit';

const Language = createSlice({
    name: "Language",
    initialState: {
        language: ''
    },
    reducers: {
        getLangAsnc(state, action) {
            const { Lang } = action.payload
            // console.log("getLangAsync reducer : ", Lang)
            state.language = Lang
        },
        getLang(state, action) {
            // console.log("getLang reducer : ", action)
        },
        setLang(state, action) {
            // console.log("setLang reducer : ", action)
            state.language = action.payload
        }
    }
})

export const { setLang, getLang, getLangAsnc } = Language.actions;

export default Language.reducer;