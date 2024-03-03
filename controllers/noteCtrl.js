const Note = require('./../models/note')
const asyncHandler = require('express-async-handler')
const validateMongoDbIds = require('./../utils/validateMongoDbIds')
const {validationResult} = require('express-validator')

const createNote = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try{
            await Note.create({
                title: req.body?.title,
                description: req.body?.description,
                tag: req.body?.tag,
                author: req.user?._id
            }).then((resp) => {
                res.status(201).json(resp);
            })
        }catch(e){
            res.status(400).json({message: e.message})
        }
        
    } else {
        res.status(400).json({errors: errors.array()})
    }

})


const getAllNotes = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    validateMongoDbIds(userId);
    try{
        await Note.find({author: userId}).populate("author").then((resp) => {
            res.status(200).json(resp);
        })
    }catch(e){
        throw new Error(e);
    }
})

module.exports = {createNote, getAllNotes}