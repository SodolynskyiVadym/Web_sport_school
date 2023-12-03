const express = require('express');
const scheduleController = require("../controllers/scheduleController");

const router = express.Router();

router
    .get("/getSchedule/:groupID", scheduleController.getSchedule)
    .get("/getSchedules/:groupName", scheduleController.getSchedulesGroup)
    .post("/getScheduleUser", scheduleController.getScheduleUser)
    .post("/createSchedule", scheduleController.createSchedule)
    .delete("/deleteSchedule/:scheduleID", scheduleController.deleteSchedule)

module.exports = router;