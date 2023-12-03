const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    groupID: {
        type: mongoose.Schema.ObjectId,
        ref: "Group"
    },
    coachID: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        require: [true, "Please, enter a date"]
    },
    time: {
        type: String,
        require: [true, "Please, enter a time"],
        // validate: {
        //     validator: value => /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(value),
        //     message: "Invalid time format. Please use the format 9:30-12:30."
        // }
    }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;