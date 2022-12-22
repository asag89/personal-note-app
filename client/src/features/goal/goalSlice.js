
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    goalPageType: "current",
    goals: [],
    goalDetails: {},  // for the modal
    processedId: "",
    completedGoals: [],
    currentGoals: [],
    isLoading: false,
    isError: false,
    message: "",
}

export const createGoal = createAsyncThunk("goal/createGoal", async (goal, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.post("/api/goals", goal, config)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const getGoals = createAsyncThunk("goal/getGoals", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get("/api/goals", config)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const completeGoal = createAsyncThunk("goal/completeGoal", async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.put("/api/goals/complete", { goalId }, config)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const deleteGoal = createAsyncThunk("goal/deleteGoal", async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.delete(`/api/goals/${goalId}`, config)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        changeType: (state, action) => {
            state.goalPageType = action.payload
        },
        changeComplete: (state, action) => {
            state.currentGoals = action.payload.filter((item) => {
                return item.isCompleted === false
            })
            state.completedGoals = action.payload.filter((item) => {
                return item.isCompleted === true
            })
        },
        setGoal: (state, action) => {
            state.goalDetails = action.payload
        },
        clearGoalState: (state) => {
            state.goals = []
            state.goalDetails = {}
            state.processedId = ""
            state.completedGoals = []
            state.currentGoals = []
        }
    },
    extraReducers: (builder) => {
        builder

            // craete goal
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.goals.unshift(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // gel goals
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // complete goal
            .addCase(completeGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(completeGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.goals.forEach((item) => {
                    if (item._id === action.payload._id) {
                        item.isCompleted = true
                    }
                })
            })
            .addCase(completeGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // delete goal
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.goals = state.goals.filter((item) => {
                    return item._id !== action.payload
                })
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { changeType, changeComplete, setGoal, clearGoalState } = goalSlice.actions
export default goalSlice.reducer
