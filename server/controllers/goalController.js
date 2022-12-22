// packages
import { StatusCodes } from "http-status-codes"

// models
// import User from "../models/User.js"

// errors
import BadRequestError from "../errors/badRequest.js"
import UnAuthenticatedError from "../errors/unAuthenticated.js"

import Goal from "../models/Goal.js"

// no need try-catch or etc, because using express-async-errors

// create goal
const createGoal = async (req, res) => {

    const { goal } = req.body

    if (!goal) {
        throw new BadRequestError("Please enter your goal")
    }

    const newGoal = await Goal.create({
        text: goal,
        username: req.user.username,
        createdBy: req.user._id,
    })

    res.status(StatusCodes.CREATED).json(newGoal)
}

const getGoals = async (req, res) => {

    const posts = await Goal.find({ createdBy: req.user._id }).sort("-createdAt")
    res.status(StatusCodes.OK).json(posts)
}

const completeGoal = async (req, res) => {
    const { goalId } = req.body
    const note = await Goal.findById({ _id: goalId })

    if (!note) {
        throw new BadRequestError("There is no note")
    }

    if (note.isCompleted === true) {
        throw new BadRequestError("Something went wrong")

    }

    await note.updateOne({
        isCompleted: true
    })

    await note.save()

    res.status(StatusCodes.OK).json(note)

}

const deleteGoal = async (req, res) => {
    const { goalId } = req.params

    const goal = await Goal.findById({ _id: goalId })

    if (!goalId) {
        throw new BadRequestError("Something went wrong, please try again later")
    }

    await goal.remove()
    res.status(StatusCodes.OK).json(goalId)

}


export { createGoal, getGoals, completeGoal, deleteGoal }