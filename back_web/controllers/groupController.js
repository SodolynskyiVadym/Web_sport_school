const Group = require("../models/groupModel");
const Price = require("../models/priceModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


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

exports.getGroupByName = catchAsync(async (req, res, next) => {
    const group = await Group.findOne({name: req.body.name});

    if (!group) return next(new AppError("Group not found"), 400);

    res.status(200)
        .json({
            success: "success",
            group
        });
});

exports.updateGroup = catchAsync(async (req, res, next) => {
    const group = await Group.findById(req.body.id, req.body, {new: true});
    const price = await Price.findById(group.priceID);

    if (group.currentMembers < req.body.currentMembers) return next(new AppError("Limit members can't be less than current members"), 400);

    if (!group) return next(new AppError("Group not found"), 400);

    group.limitMembers = req.body.limitMembers;
    group.name = req.body.name;
    group.description = req.body.description;
    group.kindSport = req.body.kindSport;
    price.price = req.body.price;
    price.discount = req.body.discount;

    price.markModified("price");
    group.markModified("name");

    group.save();
    price.save();

    res.status(200)
        .json({
            success: "success",
        });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
    const group = await Group.findByIdAndDelete(req.body.groupID);

    const users = await User.find(user => user.groupsID.includes(group._id));

    for(let user of users){
        user.groupsID = user.groupsID.filter(e => !e===group._id);
        user.update();
    }

    res.status(200)
        .json({
            success: "success",
        });
});

// exports.getAllGroupsCoach = catchAsync(async (req, res, next) => {
//     const groups = await Group.find({coachID: req.params.coachID});
//
//     if (!groups) return next(new AppError("Group not found"), 400);
//
//     res.status(200)
//         .json({
//             success: "success",
//             groups
//         });
// });