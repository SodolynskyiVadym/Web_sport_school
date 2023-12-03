const {promisify} = require("util");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt = require("bcrypt")



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user) => {
    const token = signToken(user._id);

    user.password = undefined;

    return token;
};

exports.signup = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const newUser = await User.create(req.body);

    console.log("code work")
    const token = createSendToken(newUser);

    console.log(token)
    console.log(newUser)

    res.status(201).json({
        status: 'success',
        token,
        user: newUser
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError('Please provide email and password!', 400));

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new AppError('Incorrect email or password', 401));

    const token = createSendToken(user);

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id).select("+password");

    if (!currentUser) return next(new AppError("User don't exist", 401));

    if (!bcrypt.compare(password, currentUser.password)) return next(new AppError('Incorrect password', 401));

    user.password = undefined;

    res.status(201).json({
        status: 'success',
        token,
        user,
    });
});

exports.getUserByName = catchAsync(async (req, res, next) => {
    const token = req.body.token;
    if (!token) return next(new AppError('Not found token', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("+password");

    if (!currentUser) return next(new AppError("User don't exist", 401));

    const role = currentUser.role;
    const id = currentUser._id;


    res.status(201).json({
        status: 'success',
        id,
        role
    });
});