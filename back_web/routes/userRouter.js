const express = require('express');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .get("/getUser/:id", userController.getUser)
    .get("/getCoach/:id", userController.getCoach)
    .get("/getUserSchedule/:id", userController.getScheduleUser)
    .get("/getAllUsers", userController.getAllUsers)
    .get("/getAllCoaches", userController.getAllCoaches)
    .get("/getUserGroups/:userID", userController.getGroupsUser)
    .post("/getRoleUser", authController.getUserByName)
    .post("/updateUser/:id", userController.updateUser)
    .post("/setPassword", userController.setPassword)
    .post("/joinGroup", userController.joinGroup)
    .post("/createUser", authController.signup)
    .post("/login", authController.login)
    .patch("/updateUser/:id", userController.updateUser)

module.exports = router;