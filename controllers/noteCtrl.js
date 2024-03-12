const Note = require('./../models/note')
const {ObjectId} = require( 'mongodb' )
const asyncHandler = require('express-async-handler')
const validateMongoDbIds = require('./../utils/validateMongoDbIds')
const {validationResult} = require('express-validator')

const createNote = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
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


const updateNote = asyncHandler(async (req, res) => {
    const noteId = req.params.noteId;
    validateMongoDbIds(noteId);
    try {
        if(`req.body !== {}`) {
            let note = await Note.findOne({_id: noteId});
            let userId = req.user?._id;
            userId = new ObjectId(userId);
            if(note.author.toString() === userId.toString()) {
                await Note.findByIdAndUpdate(noteId, {
                    title: req.body?.title,
                    description: req.body?.description,
                    tag: req.body?.tag
                }, {
                    new: true
                }).populate("author").then((resp) => {
                    res.status(200).json(resp);
                });
            }else{
                res.status(403).json({message: "You are not authorised to update the note"});
            }
            
        } else {
            res.status(400).json('Please give some data to update the note!!');
        }
    } catch(e) {
        res.status(400).json(e.message);
    }
});


const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.noteId
    validateMongoDbIds(noteId);
    try{
        let note = await Note.findOne({_id: noteId});
        let userId = req.user?._id;
        userId = new ObjectId(userId);
        if(note.author.toString() === userId.toString()) {
            await Note.findByIdAndDelete({_id: noteId}).then(() => {
                res.status(200).json({message: "The note is successfully deleted!!"});
            });
        }else{
            res.status(403).json({message: "You are not authorised to update the note"});
        }
    }catch(e){
        res.status(400).json(e.message);
    }
})

module.exports = {createNote, getAllNotes, updateNote, deleteNote}