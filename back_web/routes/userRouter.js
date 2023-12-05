const express = require('express');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const groupController = require("../controllers/groupController");

const router = express.Router();

router
    .get("/getUser/:id", userController.getUser)
    .get("/getCoach/:id", userController.getCoach)
    .get("/getUserSchedule/:id", userController.getScheduleUser)
    .get("/getAllUsers", userController.getAllUsers)
    .get("/getAllCoaches", userController.getAllCoaches)
    .get("/getUserGroups/:userID", userController.getGroupsUser)
    .get("/getCoachGroups/:coachID", userController.getAllGroupsCoach)
    .get("/getRoleUser/:token", authController.getUserByName)
    .post("/updateUser/:id", userController.updateUser)
    .post("/setPassword", userController.setPassword)
    .post("/joinGroup", userController.joinGroup)
    .post("/createUser", authController.signup)
    .post("/createCoach", userController.createCoach)
    .post("/login", authController.login)
    .post("/createReservePassword", authController.createReservePassword)
    .post("/loginViaReservePassword", authController.loginViaReservePassword)
    .patch("/updateUser/:id", userController.updateUser)
    .patch("/leaveGroup", userController.leaveFromGroup)
    .delete("/deleteUser/:id", userController.deleteUser)

module.exports = router;