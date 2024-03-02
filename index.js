const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const dbConnect = require('./config/dbConnect')
const morgan = require("morgan")
const bodyParser = require('body-parser')

dbConnect();
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port",PORT);
})