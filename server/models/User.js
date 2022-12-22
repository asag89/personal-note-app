import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username field"],
        minlength: 3,
        maxlength: 20,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please add email field"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 3,
        maxlength: 20,
        select: false
    },
    quote: {
        type: String,
        default: "Life is short Birds are flying",
        maxlength: 30,
    },
},
    { timestamps: true }
)

UserSchema.pre("save", async function () {

    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model("User", UserSchema)


