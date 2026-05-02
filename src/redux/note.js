import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name:"note",
    initialState:{notes:[], 
    },
    reducers:{
        setReduxNotes:(state, action)=>{state.notes = action.payload},
        addNote: (state, action) => { state.notes.unshift(action.payload) }
    }
})
export const {setReduxNotes,addNote} = noteSlice.actions
export default noteSlice.reducer
  