import express from "express"
const router = express.Router()

import {
    createGoal,
    getGoals,
    completeGoal,
    deleteGoal
} from "../controllers/goalController.js"

// user authorization
import auth from "../middleware/auth.js"

router.post("/", auth, createGoal) // create goal

router.get("/", auth, getGoals) // get goals

router.put("/complete", auth, completeGoal) // get goals

router.delete("/:goalId", auth, deleteGoal) // delete goal

export default router
