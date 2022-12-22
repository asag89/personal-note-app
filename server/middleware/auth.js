
import jwt from "jsonwebtoken"
import UnAuthenticatedError from "../errors/unAuthenticated.js"
import User from "../models/User.js"

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnAuthenticatedError("Authentication Invalid")
    }

    // get token from header
    const token = authHeader.split(" ")[1]

    try {

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId)
        next()
    }
    catch (error) {
        throw new UnAuthenticatedError("Authentication Invalid")
    }
}

export default auth