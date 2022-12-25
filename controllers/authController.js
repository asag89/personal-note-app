// packages
import { StatusCodes } from "http-status-codes"

// models
import User from "../models/User.js"

// errors
import BadRequestError from "../errors/badRequest.js"
import UnAuthenticatedError from "../errors/unAuthenticated.js"

// no need try-catch or etc, because using express-async-errors

// user register
const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new BadRequestError("Please provide all values")
    }

    const emailAlreadyExist = await User.findOne({ email })
    const usernameAlreadyExist = await User.findOne({ username })

    if (emailAlreadyExist) {
        throw new BadRequestError("Email already in use")
    }

    if (usernameAlreadyExist) {
        throw new BadRequestError("Username already in use")
    }

    const user = await User.create({ username, email, password })
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
    })
}

// user login
const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("Please provide all values")
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new UnAuthenticatedError("Please check your credentials.")
    }

    const isPassword = await user.comparePassword(password)

    if (!isPassword) {
        throw new UnAuthenticatedError("Please check your password")
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
    })
}

export { login, register }