const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Review = require("../models/reviewModel");


exports.writeReview = catchAsync(async (req, res, next) => {
    const review = await Review.create({
        userID: req.body.userID,
        coachID: req.body.coachID,
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
    console.log(req.body)
    const review = await Review.findOneAndUpdate({userID: req.body.userID, coachID: req.body.coachID}, req.body, {new: true});
    console.log(review)

    res.status(201)
        .json({
            success: "success",
            review
        });
});


exports.getOneReview = catchAsync(async (req, res, next) => {
    let review = await Review.findOne({coachID: req.params.coachID, userID: req.params.userID});

    let isReview = true
    if (!review){
        review = "";
        isReview = false
    }

    res.status(201)
        .json({
            success: "success",
            review,
            isReview
        });
});

exports.getReviews = catchAsync(async (req, res, next) => {
    let reviews = await Review.find({coachID: req.params.coachID});

    res.status(201)
        .json({
            success: "success",
            reviews
        });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    const review = await Review.findOneAndDelete({userID: req.params.userID, coachID: req.params.coachID})

    if (!review) return next(new AppError("Review not found"), 401);

    res.status(201)
        .json({
            success: "success",
            review
        });
});