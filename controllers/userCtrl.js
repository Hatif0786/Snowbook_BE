const User = require('./../models/user')
const asyncHandler = require('express-async-handler');
const {validationResult} = require('express-validator')
const {generateToken} = require('../config/jwtToken')


//Create a new User 
const createUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const {email} = req.body
        try{
            const alreadyExistsUser = await User.findOne({email: email});
            if(alreadyExistsUser!==null){
                res.status(409).json({message:'User already Exists!!'})
            }else{
                User.create(req.body).then((createdUser)=>{
                    res.status(201).json(createdUser);
                })
            }
        }catch(e){
            throw new Error(e);
        }
    }else{
        res.status(400).json({errors: errors.array()})
    }
})


//Login with existing user
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const findUser = await User.findOne({email})
    if(findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateToken(findUser?._id)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000
        })
        res.status(200).json({
            userId: findUser?._id,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: refreshToken
        })
    }else{
        throw new Error("Sorry! Your credentials doesn't matched!!")
    }
})


module.exports = {createUser, loginUser}