const Schedule = require("../models/scheduleModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");


exports.getSchedule = catchAsync(async (req, res, next) => {
    const schedules = await Schedule.find({groupID: req.params.groupID});

    if (!schedules) return next(new AppError("Schedule not found"), 401);

    res.status(200)
        .json({
            success: "success",
            schedules
        });
});

exports.updateSchedule = catchAsync(async (req, res, next) => {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.scheduleID, req.body, {new: true});

    if (!updatedSchedule) return next(new AppError("Schedule not found"), 401);

    res.status(201)
        .json({
            success: "success",
            updatedSchedule
        });
});


exports.createSchedule = catchAsync(async (req, res, next) => {
    console.log(req.body.groupID + " GroupID")
    console.log(req.body.coachID + " CoachID")
    const schedule = await Schedule.create({
        groupID: req.body.groupID,
        coachID: req.body.coachID,
        date: req.body.date,
        time: req.body.timeLesson
    });

    res.status(200)
        .json({
            success: "success",
            schedule
        });
});

exports.getScheduleUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userID);

    console.log(user);

    if (!user) return next(new AppError("User not found"), 401);

    const schedulePromises = user.groupsID.map(async (groupID) => await Schedule.findOne({ groupID: groupID })
        .populate({
            path: "groupID",
            select: "name"
        }));

    const schedules = await Promise.all(schedulePromises);

    console.log(schedules);

    res.status(200).json({
        success: "success",
        schedules
    });
});


exports.getScheduleByName = catchAsync(async (req, res, next) => {
    const allSchedules = await Schedule.find().populate({
        path: "groupID",
        select: "name"
    });
    const schedules = await allSchedules.filter(schedule => schedule.groupID.name === req.params.nameGroup)

    console.log(schedules)
    if (!schedules) return next(new AppError("Schedule not found"), 401);

    res.status(200)
        .json({
            success: "success",
            schedules
        });
});

exports.deleteSchedule = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.scheduleID);


    res.status(200).json({
        success: "success"
    });
});
