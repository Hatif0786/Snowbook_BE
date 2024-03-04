const express = require("express")
const { authMiddleware } = require("../middlewares/authMiddleware")
const { getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/noteCtrl")
const Router = express.Router()
const {body} = require('express-validator')

Router.get("/", authMiddleware, getAllNotes)
Router.post("/add", authMiddleware, [body("title").notEmpty().withMessage('Title is required').isLength({ min: 5 }).withMessage('Title must be 5 characters long'), body("description").notEmpty().withMessage('Description is required').isLength({ min: 10 }).withMessage('Description must be 5 characters long')], createNote)
Router.patch("/update/:noteId", authMiddleware, updateNote)
Router.delete("/delete/:noteId", authMiddleware, deleteNote)

module.exports = Router