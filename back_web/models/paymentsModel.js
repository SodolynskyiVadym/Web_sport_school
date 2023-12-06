const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    groupID: {
        type: mongoose.Schema.ObjectId,
        ref: "Group"
    },
    price: Number,
    confirmed: {
        type: Boolean,
        default: false
    }
});

const Pay = mongoose.model("Pay", priceSchema);

module.exports = Pay;