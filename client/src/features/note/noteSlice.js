

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const kw = JSON.parse(localStorage.getItem("kw"))

const initialState = {
    notes: [],
    singleNote: null,
    isLoading: false,
    isError: false,
    filteredKeyword: kw || null,
    message: "",
}

export const createNote = createAsyncThunk("goal/createNote", async (note, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.post("/api/notes", note, config)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const getNotes = createAsyncThunk("goal/getNotes", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get("/api/notes", config)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const deleteNote = createAsyncThunk("goal/deleteNote", async (noteId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.delete(`/api/notes/${noteId}`, config)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})


const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        filterByKeyword: (state, action) => {
            state.filteredKeyword = action.payload
            localStorage.setItem("kw", JSON.stringify(action.payload))

        },
        setNoteId: (state, action) => {
            state.singleNote = action.payload
        },
        clearNoteState: (state) => {
            state.notes = []
            state.singleNote = null
        }
    },
    extraReducers: (builder) => {
        builder

            // craete note
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.notes.unshift(action.payload)
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // get notes
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // delete note
            .addCase(deleteNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.notes = state.notes.filter((note) => note._id !== action.payload)
                state.singleNote = {}
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { filterByKeyword, setNoteId, clearNoteState } = noteSlice.actions
export default noteSlice.reducer
