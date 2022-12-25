import express from "express"
const router = express.Router()

import {
    createNote,
    getNotes,
    deleteNote
} from "../controllers/noteController.js"

// user authorization
import auth from "../middleware/auth.js"

router.post("/", auth, createNote) // create note

router.get("/", auth, getNotes) // get notes

router.delete("/:noteId", auth, deleteNote)     // delete note


export default router
