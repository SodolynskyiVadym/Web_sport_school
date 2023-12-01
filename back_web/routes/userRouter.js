const express = require('express');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .get("/getUser/:id", userController.getUser)
    .get("/getUserSchedule/:id", userController.getScheduleUser)
    .get("/getAllUsers", userController.getAllUsers)
    .get("/getAllCoaches", userController.getAllCoaches)
    .post("/getRoleUser", authController.getUserByName)
    .post("/joinGroup", userController.joinGroup)
    .post("/createUser", authController.signup)
    .post("/login", authController.login)
    .patch("/updateUser/:id", userController.updateUser)

module.exports = router;