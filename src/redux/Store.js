import {configureStore} from '@reduxjs/toolkit'
import modalReducer from './CreateModel'
import noteReducer from './note'

const store = configureStore({
    reducer:{
        modal: modalReducer,
        note:noteReducer
    }
})

export default store