const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError("User not found"), 403);

    res.status(201)
        .json({
            success: "success",
            user
        });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findOneAndUpdate(req.params.id, req.body, {new: true});

    if (!user) return next(new AppError("User not found"), 403);

    res.status(201)
        .json({
            success: "success",
            user
        });
});


exports.getAllCoaches = catchAsync(async (req, res, next) => {
    const coaches = await User.find({role: "coach"});

    res.status(201)
        .json({
            success: "success",
            coaches
        });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(201)
        .json({
            success: "success",
            users
        });
});



exports.getScheduleUser = catchAsync(async (req, res, next) => {
    const userSchedule = await User.findById(req.params.id)
        .populate("groupsID");

    const group = userSchedule.groupsID[0];

    if (!userSchedule) return next(new AppError("User not found"), 403);

    res.status(201)
        .json({
            success: "success",
            userSchedule,
            group
        });
});

exports.joinGroup = catchAsync(async (req, res, next) => {
    console.log("---------------------------");
    console.log("code works");

    const user = await User.findByIdAndUpdate(
        req.body.userID,
        { $push: { groupsID: req.body.groupID } },
        { new: true } // Опція new поверне оновлений документ
    );

    res.status(201).json({
        success: "success",
        user
    });
});


// exports.deleteUsers = catchAsync(async (req, res, next) => {
//     const deletedUsers = User.deleteMany()
//
//     const group = userSchedule.groupsID[0];
//
//     if (!userSchedule) return next(new AppError("User not found"), 403);
//
//     res.status(201)
//         .json({
//             success: "success",
//             userSchedule,
//             group
//         });
// });