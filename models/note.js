const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    tag:{
        type:String,
        default: "General"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // The User is a document in another collection called 'users'
        required: true,
    }
}, {
    timestamps: true    
});

//Export the model
module.exports = mongoose.model('Note', noteSchema);