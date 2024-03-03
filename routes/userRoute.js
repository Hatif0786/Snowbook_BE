const express = require('express')
const { createUser, loginUser } = require('../controllers/userCtrl')
const Router = express.Router()
const {body} = require("express-validator");


Router.post('/add',
[body('name')
.notEmpty()
.withMessage('Username is required'),

body('email')
.isEmail()
.withMessage('Email is required'),

body('password')
.isAlphanumeric()
.withMessage('Password must be alphanumeric')
.isLength({ min: 8, max: 12 })
.withMessage('Password must be between 8 and 12 characters long')
.notEmpty()
.withMessage('Password is required'),
], createUser)


Router.post('/login', loginUser)

module.exports = Router