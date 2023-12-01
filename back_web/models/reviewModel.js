const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    // userID: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    // },

    coachID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },

    rating: {
        type: Number,
        required: [true, "Please enter a rating"],
        min: 0,
        max: 5
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    description: {
        type: String,
        required: [true, "Please enter your comment"]
    }
});


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;