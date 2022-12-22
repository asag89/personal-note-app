

import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    modalType: null,
    modalLocation: null
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.modalType = action.payload
            state.modalLocation = window.location.pathname

        }
    }
})

export const { showModal } = modalSlice.actions
export default modalSlice.reducer
