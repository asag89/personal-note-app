
import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.model("Goal", GoalSchema)