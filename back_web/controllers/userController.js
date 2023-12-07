const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Group = require("../models/groupModel");
const Review = require("../models/reviewModel");
const Pay = require("../models/paymentsModel");
const {removeItem} = require("../utils/mathCalculate");
const email = require("../utils/email");
const crypto = require("crypto");



exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError("User not found"), 403);

    res.status(201)
        .json({
            success: "success",
            user
        });
});

exports.getCoach = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    const groups = await Group.find({coachID: req.params.id})

    if (!user) return next(new AppError("User not found"), 403);

    res.status(201)
        .json({
            success: "success",
            user,
            groups
        });
});


exports.createCoach = catchAsync(async (req, res, next) => {
    if (await User.findOne({email: req.body.email})) return next(new AppError("Email already exist"));

    const password = crypto.randomBytes(10).toString("hex");

    const coach = await User.create({
        name: "",
        lastName: "",
        birth: Date.now(),
        phone: "",
        email: req.body.email,
        role: "coach",
        gender: "male",
        password: password
    });

    await email.sendReservePassword({
        email: coach.email,
        subject: "Registration success",
        message: `Your password ${password}`
    });


    res.status(201)
        .json({
            success: "success",
            user: coach
        });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError("User not found"), 403);

    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    user.phone = req.body.phone;
    user.birth = req.body.birth;

    user.markModified("name");

    user.save();

    res.status(201)
        .json({
            success: "success",
            user
        });
});

exports.setPassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userID);

    if (!user) return next(new AppError("User not found"), 403);

    user.password = req.body.password;

    user.markModified("password");

    user.save();

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
    let users = await User.find();
    users = users.filter(user => user.role != "admin");
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
    const user = await User.findById(req.body.userID);

    const group = await Group.findById(req.body.groupID);

    const payment = await Pay.findOne({userID: user._id, groupID: group._id});
    console.log(!payment || !payment.confirmed)
    console.log(payment.confirmed && user.groupsID.includes(group._id))

    // if (!payment || !payment.confirmed) return next(new AppError("You don't pay for group", 403));

    if (payment.confirmed && user.groupsID.includes(group._id)) return next(new AppError("You are already in this group", 403));

    if (!user || !group) return next(new AppError("User or group not found"), 404)
    if (user.groupsID.includes(req.body.groupID)) return next(new AppError("You already register oin this group"), 403)
    if (group.limitMembers === group.currentMembers) return next(new AppError("This group is full"), 403)

    await user.update({
        $push: { groupsID: req.body.groupID },
        new: true
    });

    group.currentMembers += 1;

    group.markModified("currentMembers");
    group.save()
    payment.update({confirmed: true});
    res.status(201).json({
        success: "success",
        user
    });
});

exports.leaveFromGroup = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userID);
    const group = await Group.findById(req.body.groupID)


    if (!user || !group) {
        return next(new AppError("User or group not found", 404));
    }

    if (!user.groupsID.includes(req.body.groupID)) return next(new AppError("You are not registered in this group", 403));

    group.currentMembers -= 1;
    group.markModified("currentMembers");
    await group.save()

    user.groupsID.pull(req.body.groupID);

    user.markModified("groupsID");

    await user.save();

    res.status(200).json({
        success: "success",
        user
    });
});


exports.getGroupsUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userID)

    let groups = await Group.find().populate({
        path: "coachID",
        select: "_id name lastName"
    });

    groups = groups.filter(group => user.groupsID.includes(group._id));

    res.status(201).json({
        success: "success",
        groups
    });
});

exports.getAllGroupsCoach = catchAsync(async (req, res, next) => {
    const groups = await Group.find({coachID: req.params.coachID})
        .populate({
            path: "priceID",
            select: "price discount"
        });

    if (!groups) return next(new AppError("Group not found"), 400);

    res.status(200)
        .json({
            success: "success",
            groups
        });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) return next(new AppError("User nit found"), 401);

    if (user.role === "user"){
        let groups = await Group.find({_id: user.groupsID});

        await Review.deleteMany({userID: user._id});

        for (let group of groups){
            group.currentMembers -= 1;
            group.markModified("currentMembers");
            group.save();
        }

    }else if(user.role === "coach"){
        const users = await User.find();

        const groups = await Group.find({coachID: user._id});

        console.log(groups)

        let groupsID = []
        for (let group of groups){
            groupsID.push(group._id)
        }

        for (let user of users){
            for (let groupID of groupsID){
                user.groupsID = await removeItem(user.groupsID, groupID);
            }
            await user.save();
        }

        await Review.deleteMany({coachID: user._id});


        await Group.deleteMany({coachID: user._id});
    }

    await User.deleteOne(user);

    res.status(200)
        .json({
            success: "success"
        });

});