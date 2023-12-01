const Group = require("../models/groupModel");
const Price = require("../models/priceModel");
const Schedule = require("../models/scheduleModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createGroup =  catchAsync(async (req, res, next) => {
    const price = await Price.create({
        price: req.body.price,
        discount: req.body.discount,
    });


    const createdGroup = await Group.create({
        name: req.body.name,
        description: req.body.description,
        kindSport: req.body.kindSport,
        limitMembers: req.body.limitMembers,
        coachID: req.body.coachID,
        priceID: price
    });



    res.status(201)
        .json({
            success: "success",
            createdGroup,
            price
        });
});


exports.getAllGroups = catchAsync(async (req, res, next) => {
    const groups = await Group.find()
        .populate({
            path: "coachID",
            select: "name lastName patronymic _id"
        })
        .populate({
            path: "priceID",
            select: "price discount -_id"
        });

    res.status(200)
        .json({
            success: "success",
            groups
        });
});


exports.getGroup = catchAsync(async (req, res, next) => {
    const group = await Group.findById(req.params.id)
        .populate({
            path: "coachID",
            select: "name lastName patronymic _id"
        })
        .populate({
            path: "priceID",
            select: "price discount -_id"
        });


    if (!group) return next(new AppError("Group not found"), 400);


    res.status(200)
        .json({
            success: "success",
            group,
            schedule: group.schedule
        });
});

exports.getGroupIDByName = catchAsync(async (req, res, next) => {
    console.log(req.body.name)
    const group = await Group.findOne({name: req.body.name});

    if (!group) return next(new AppError("Group not found"), 400);

    console.log("---------------------------------")
    console.log(group)
    console.log(group._id)

    const id = group._id
    res.status(200)
        .json({
            success: "success",
            id
        });
});