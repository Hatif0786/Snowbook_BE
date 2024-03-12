const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()
const dbConnect = require('./config/dbConnect')
const morgan = require("morgan")
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRoute')
const noteRouter = require('./routes/noteRoute')
const {errorHandler, notFound} = require('./middlewares/errorHandler')

dbConnect();
app.use(morgan('combined'))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/note', noteRouter)
app.use(errorHandler);
app.use(notFound);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port",PORT);
})