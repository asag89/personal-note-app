import express from "express"
const router = express.Router()

import {
    register,
    login,
} from "../controllers/authController.js"

// user authorization
import auth from "../middleware/auth.js"

router.post("/register", register) // user register

router.post("/login", login)    // user login


export default router