const express = require('express');
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.route("/:coachID")
    .get(reviewController.getReview)
    .post(reviewController.writeReview)
    .patch(reviewController.updateReview)

module.exports = router;