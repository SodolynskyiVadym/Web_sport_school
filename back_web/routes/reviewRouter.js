const express = require('express');
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router
    .get("/getReviews/:coachID", reviewController.getReviews)
    .get("/getReview/:userID/:coachID", reviewController.getOneReview)
    .post("/createReview", reviewController.writeReview)
    .patch("/updateReview", reviewController.updateReview)
    .delete("/deleteReview/:userID/:coachID", reviewController.deleteReview)

module.exports = router;