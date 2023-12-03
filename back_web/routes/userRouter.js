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
    .post("/getRoleUser", authController.getUserByName)
    .post("/updateUser/:id", userController.updateUser)
    .post("/setPassword", userController.setPassword)
    .post("/joinGroup", userController.joinGroup)
    .post("/leaveGroup", userController.leaveFromGroup)
    .post("/createUser", authController.signup)
    .post("/login", authController.login)
    .patch("/updateUser/:id", userController.updateUser)
    .delete("/deleteUser/:id", userController.deleteUser)

module.exports = router;