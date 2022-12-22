// packages
import { StatusCodes } from "http-status-codes"

// models
// import User from "../models/User.js"
import Note from "../models/Note.js"
// errors
import BadRequestError from "../errors/badRequest.js"
import UnAuthenticatedError from "../errors/unAuthenticated.js"
import NotFoundError from "../errors/notFound.js"

// no need try-catch or etc, because using express-async-errors

// create note
const createNote = async (req, res) => {
    const { title, text, keywords } = req.body


    const newNote = await Note.create({
        text,
        title,
        keywords,
        username: req.user.username,
        createdBy: req.user._id,
    })

    res.status(StatusCodes.CREATED).json(newNote)
}

// get notes
const getNotes = async (req, res) => {
    const notes = await Note.find({ createdBy: req.user._id }).sort("-createdAt")
    res.status(StatusCodes.OK).json(notes)
}

const deleteNote = async (req, res) => {
    const { noteId } = req.params
    const note = await Note.findById({ _id: noteId })

    if (!note) {
        throw new NotFoundError(`Something went wrong, please try again`)
    }

    await note.remove()
    res.status(StatusCodes.OK).json(noteId)
}

export { createNote, getNotes, deleteNote }