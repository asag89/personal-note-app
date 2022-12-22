

import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice"
import modalReducer from "../features/modal/modalSlice"
import goalReducer from "../features/goal/goalSlice"
import noteReducer from "../features/note/noteSlice"
import docReducer from "../features/doc/docSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        doc: docReducer,
        modal: modalReducer,
        goal: goalReducer,
        note: noteReducer,
    }
})

export default store