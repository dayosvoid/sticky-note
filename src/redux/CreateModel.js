import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
    name:"model",
    initialState:{isOpen:false},
    reducers:{
        showModel:(state => {state.isOpen = true} ),
        hideModel:(state =>{state.isOpen = false}),
        toggleModel:(state => {state.isOpen = !state.isOpen})
    }
})
export const {showModel,hideModel,toggleModel} = modelSlice.actions

export default modelSlice.reducer