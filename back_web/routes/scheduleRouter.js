const express = require('express');
const scheduleController = require("../controllers/scheduleController");

const router = express.Router();

router
    .get("/getSchedule/:groupID", scheduleController.getSchedule)
    .get("/getSchedules/:groupName", scheduleController.getSchedulesGroup)
    .get("/getScheduleUser/:userID", scheduleController.getScheduleUser)
    .get("/getScheduleCoach/:coachID", scheduleController.getScheduleCoach)
    .post("/createSchedule", scheduleController.createSchedule)
    .delete("/deleteSchedule/:scheduleID", scheduleController.deleteSchedule)

module.exports = router;