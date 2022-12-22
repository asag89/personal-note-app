

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { clearGoalState } from "../goal/goalSlice"
import { clearNoteState } from "../note/noteSlice"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    message: "",
}

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        const { data } = await axios.post("/api/auth/register", user)
        if (data) {
            localStorage.setItem("user", JSON.stringify(data))
            clearError()
        }
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        const { data } = await axios.post("/api/auth/login", user)
        if (data) {
            localStorage.setItem("user", JSON.stringify(data))
            clearError()
        }
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    localStorage.removeItem('user')

    thunkAPI.dispatch(clearGoalState())
    thunkAPI.dispatch(clearNoteState())
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.isError = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder

            // register
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.isError = false
                state.message = ""
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.isError = false
                state.message = ""
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            // logout
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null
            })
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
