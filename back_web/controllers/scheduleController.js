const Schedule = require("../models/scheduleModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Group = require("../models/groupModel");


exports.getSchedule = catchAsync(async (req, res, next) => {
    const schedules = await Schedule.find({groupID: req.params.groupID});

    if (!schedules) return next(new AppError("Schedule not found"), 401);

    res.status(200)
        .json({
            success: "success",
            schedules
        });
});


exports.createSchedule = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const group = await Group.findOne({name: req.body.nameGroup});
    console.log(group)

    if (!group) return next(new AppError("Group not found"));

    const schedule = await Schedule.create({
        groupID: group._id,
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


exports.getSchedulesGroup = catchAsync(async (req, res, next) => {
    const group = await Group.findOne({name: req.params.groupName});

    if (!group) return next(new AppError("Group not found"));

    const schedules = await Schedule.find({groupID: group._id});

    // console.log(schedules)

    res.status(200)
        .json({
            success: "success",
            schedules
        });
});

exports.deleteSchedule = catchAsync(async (req, res, next) => {
    const schedule = await Schedule.findByIdAndDelete(req.params.scheduleID);

    res.status(200).json({
        success: "success",
        schedule
    });
});
