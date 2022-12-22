

import { createSlice } from "@reduxjs/toolkit"

const pages = [
    {
        id: 1,
        path: "/",
        text: "Home",
    },
    {
        id: 2,
        path: "/create-note",
        text: "Create Note",
    }, {
        id: 3,
        path: "/my-goals",
        text: "My Goals",
    }, {
        id: 4,
        path: "/my-notes",
        text: "My Notes",
    }, {
        id: 3,
        path: "/my-goals",
        text: "My Goals",
    }
]

const initialState = {
    doc: null,
    pages,
    currentPage: ""
}

const docSlice = createSlice({
    name: "doc",
    initialState,
    reducers: {
        setDoc: (state, action) => {
            state.doc = action.payload

        },
        setPage: (state, action) => {

            const currPage = state.pages.find((item) => {
                return item.path === action.payload
            })

            if (!currPage) {
                state.currentPage = null
            }
            else {
                state.currentPage = currPage.text
            }
        }
    }
})

export const { setDoc, setPage } = docSlice.actions
export default docSlice.reducer
