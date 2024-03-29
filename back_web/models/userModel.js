const mongoose = require("mongoose")
const validator = require('validator');
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please, enter your name"]
    },
    lastName: {
        type: String,
        require: [true, "Please, enter your last name"]
    },
    password: {
        type: String,
        require: [true, "Please, enter your password"],
        minlength: 8,
        select: false
    },
    descriptionCoach: {
        type: String
    },
    birth: {
        type: Date,
        require: [true, "Please, enter your birth"],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    gender: {
        type: String,
        require: [true, "Please, enter your gender"],
        enum: ["male", "female"]
    },
    phone: {
        type: String,
        require: [true, "Please, enter your phone"]
    },

    groupsID: [{
        type: mongoose.Schema.ObjectId,
        ref: "Group"
    }],

    role: {
        type: String,
        enum: ['user', 'coach', 'admin'],
        default: 'user'
    },

    reservePassword: String
});

userSchema.virtual("schedule", {
    ref: "Schedule",
    localField: "groupsID",
    foreignField: "groupID"
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre("save", async function(next){
    if (!this.reservePassword) return next();

    this.reservePassword = await bcrypt.hash(this.reservePassword, 12);
    next();
})


userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;