const mongoose = require('mongoose')

const dbConnect = () => {
    const dbUrl = process.env.MONGODB_URL
    try{ 
        const conn = mongoose.connect(dbUrl)
        console.log('Database connected successfully!');
    }catch(e){
        console.log('Connected refused!');
    }
}

module.exports = dbConnect; 