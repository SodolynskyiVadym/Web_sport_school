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
    const group = await Group.findOne({name: req.body.nameGroup});

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
    const user = await User.findById(req.params.userID);

    if (!user) return next(new AppError("User not found"), 401);

    let schedules = await Schedule.find().populate({
        path: "groupID",
        select: "name _id"
    });

    let schedulesArr = []

    for (let schedule of schedules){
        for (let groupID of user.groupsID){
            if (schedule.groupID === null) continue
            if (schedule.groupID._id.toString() === groupID.toString()) schedulesArr.push(schedule)
        }
    }

    res.status(200).json({
        success: "success",
        schedules: schedulesArr
    });
});


exports.getSchedulesGroup = catchAsync(async (req, res, next) => {
    const group = await Group.findOne({name: req.params.groupName});

    if (!group) return next(new AppError("Group not found"));

    const schedules = await Schedule.find({groupID: group._id});


    res.status(200)
        .json({
            success: "success",
            schedules
        });
});

exports.getScheduleCoach = catchAsync(async (req, res, next) => {
    const coach = await User.findById(req.params.coachID);

    if (!coach) return next(new AppError("User not found"), 401);

    const schedules  = await Schedule.find({coachID: coach._id}).populate({
        path: "groupID",
        select: "_id name"
    });

    res.status(200).json({
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
