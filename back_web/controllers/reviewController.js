const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Review = require("../models/reviewModel");


exports.writeReview = catchAsync(async (req, res, next) => {
    const review = await Review.create({
        coachID: req.params.coachID,
        // userID: "in development",
        description: req.body.description,
        rating: req.body.rating
    });

    res.status(201)
        .json({
            success: "success",
            review
        });
});


exports.updateReview = catchAsync(async (req, res, next) => {
    const review = await Review.findOneAndUpdate(req.params.coachID, req.body, {new: true});

    res.status(201)
        .json({
            success: "success",
            review
        });
});


exports.getReview = catchAsync(async (req, res, next) => {
    const review = await Review.find({coachID: req.params.coachID});

    if (!review) return next(new AppError("Review not found"), 401);

    res.status(201)
        .json({
            success: "success",
            review
        });
});