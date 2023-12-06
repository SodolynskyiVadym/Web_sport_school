const express = require('express');
const payRouter = require("../controllers/payController");


const router = express.Router();

router
    .get("/checkout-session/:groupID/:userID", payRouter.getCheckoutSession)

module.exports = router;