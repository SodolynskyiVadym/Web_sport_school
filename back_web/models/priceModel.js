const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
    price: {
        type: Number,
        require: [true, "Please, enter a price"]
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
});

const Price = mongoose.model("Price", priceSchema);

module.exports = Price;