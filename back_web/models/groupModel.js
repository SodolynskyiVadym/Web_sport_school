const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please, enter name of group"]
    },
    description: {
        type: String,
        require: [true, "Please, enter description of group"]
    },
    kindSport: {
        type: String,
        enum: ['football', 'volleyball', "basketball", "icehockey", "athletics"],
        require: [true, "Please, enter a kind of sport for this group"]
    },
    coachID: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    limitMembers: {
        type: Number,
        require: [true, "Please, enter a limit for group"]
    },
    priceID: {
        type: mongoose.Schema.ObjectId,
        ref: "Price"
    },
    currentMembers: {
        type: Number,
        default: 0
    }
});

groupSchema.virtual("schedule", {
    ref: "Schedule",
    localField: "_id",
    foreignField: "groupID"
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;