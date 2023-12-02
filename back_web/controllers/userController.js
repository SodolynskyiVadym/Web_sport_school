const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Group = require("../models/groupModel");


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

    console.log(user)

    const groups = await Group.find({coachID: req.params.id})

    console.log(groups)
    if (!user) return next(new AppError("User not found"), 403);

    res.status(201)
        .json({
            success: "success",
            user,
            groups
        });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError("User not found"), 403);

    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.patronymic = req.body.patronymic;
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
    const user = await User.findById(req.body.userID);

    if (user.groupsID.includes(req.body.groupID)) return next(new AppError("You already register oin this group"), 403)

    await user.update({
        $push: { groupsID: req.body.groupID },
        new: true
    });

    res.status(201).json({
        success: "success",
        user
    });
});

exports.leaveFromGroup = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userID);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    if (!user.groupsID.includes(req.body.groupID)) return next(new AppError("You are not registered in this group", 403));

    user.groupsID.pull(req.body.groupID);

    user.markModified("groupsID");

    await user.save();

    res.status(200).json({
        success: "success",
        user
    });
});


exports.getGroupsUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userID).populate(
        {
            path: "groupsID",
            select: "_id name limitMembers kindSport coachID"
        });

    res.status(201).json({
        success: "success",
        user
    });
});

exports.getAllGroupsCoach = catchAsync(async (req, res, next) => {
    const groups = await Group.find({coachID: req.params.coachID});

    if (!groups) return next(new AppError("Group not found"), 400);

    res.status(200)
        .json({
            success: "success",
            groups
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