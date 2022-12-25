
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    username: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    keywords: {
        type: Array,
        default: [],
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.model("Note", NoteSchema)