const express = require('express');
const groupController = require("../controllers/groupController");
const authController = require("../controllers/authController");
const scheduleRouter = require("../routes/scheduleRouter");

const router = express.Router();

router.use("/schedules", scheduleRouter);

router
    .get("/getGroup/:id", groupController.getGroup)
    .get("/getAllGroup", groupController.getAllGroups)
    .get("/getCoachGroups/:coachID", groupController.getCoachGroups)
    .post("/createGroup", groupController.createGroup)
    .patch("/updateGroup", groupController.updateGroup)
    .post("/getGroupByName", groupController.getGroupByName)
    .delete("/deleteGroup/:groupID", groupController.deleteGroup)

module.exports = router;