const {promisify} = require("util");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt = require("bcrypt");
const email = require("../utils/email");



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
    const newUser = await User.create(req.body);

    const token = createSendToken(newUser);

    res.status(201).json({
        status: 'success',
        token,
        user: newUser
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError('Please provide email and password!', 401));

    const user = await User.findOne({ email }).select('+password');

    if (!user || !await bcrypt.compare(password, user.password)) return next(new AppError('Incorrect email or password', 401));

    const token = createSendToken(user);

    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // const currentUser = await User.findById(decoded.id).select("+password");
    //
    // if (!currentUser) return next(new AppError("User don't exist", 401));
    //
    // if (!bcrypt.compare(password, currentUser.password)) return next(new AppError('Incorrect password', 401));


    user.password = undefined;

    res.status(201).json({
        status: 'success',
        token,
        user,
    });
});

exports.getUserByName = catchAsync(async (req, res, next) => {
    const token = req.params.token;
    if (!token) return next(new AppError('Token not found', 403));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("+password");

    if (!currentUser) return next(new AppError("User don't exist", 401));

    const role = currentUser.role;
    const id = currentUser._id;


    res.status(201).json({
        status: 'success',
        user: currentUser,
        id,
        role
    });
});

exports.loginViaReservePassword = catchAsync(async (req, res, next) => {
    const { email, reservePassword } = req.body;

    if (!email || !reservePassword) return next(new AppError('Please provide email and password!', 401));

    const user = await User.findOne({ email }).select('+reservePassword');

    if (!user || !await bcrypt.compare(reservePassword, user.reservePassword)) return next(new AppError('Incorrect email or password', 401));

    const token = createSendToken(user);

    user.update({reservePassword: ""});

    user.reservePassword = undefined;

    res.status(201).json({
        status: 'success',
        token,
        user,
    });
});

exports.createReservePassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) return next(new AppError("This email doesn't exist" , 401));

    const reservePassword = crypto.randomBytes(10).toString("hex");
    user.reservePassword = reservePassword

    user.markModified("reservePassword");
    await user.save()

    await email.sendReservePassword({
        email: user.email,
        subject: "Your reserve password",
        message: `Your reserve password ${reservePassword}`
    });

    res.status(201).json({
        status: 'success',
    });
});