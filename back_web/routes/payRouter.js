const express = require('express');
const groupController = require("../controllers/groupController");
const authController = require("../controllers/authController");

const router = express.Router();
router
    .get("")

router
    .get("/getGroup/:id", groupController.getGroup)
    .get("/getAllGroup", groupController.getAllGroups)
    // .post("/createGroup",  authController.protect, authController.restrictTo("admin"), groupController.createGroup)
    .post("/createGroup", groupController.createGroup)

module.exports = router;