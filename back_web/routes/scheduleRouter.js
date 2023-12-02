const express = require('express');
const scheduleController = require("../controllers/scheduleController");

const router = express.Router();

router
    .get("/getSchedule/:groupID", scheduleController.getSchedule)
    .get("/getScheduleByNameGroup/:nameGroup", scheduleController.getSchedule)
    .post("/getScheduleUser", scheduleController.getScheduleUser)
    .patch("/updateSchedule/:scheduleID", scheduleController.updateSchedule)
    .post("/createSchedule", scheduleController.createSchedule)
    .delete("/deleteSchedule/scheduleID", scheduleController.deleteSchedule)

module.exports = router;