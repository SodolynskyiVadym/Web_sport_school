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
    patronymic: {
        type: String,
        require: [true, "Please, enter your patronymic"]
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
        require: [true, "Please, enter your gender"]
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

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});

userSchema.virtual("schedule", {
    ref: "Schedule",
    localField: "groupsID",
    foreignField: "groupID"
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});


userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changedTimestamp = parseInt(
//             this.passwordChangedAt.getTime() / 1000,
//             10
//         );
//
//         return JWTTimestamp < changedTimestamp;
//     }
//
//     return false;
// };

// userSchema.methods.createPasswordResetToken = function() {
//     const resetToken = crypto.randomBytes(32).toString('hex');
//
//     this.passwordResetToken = crypto
//         .createHash('sha256')
//         .update(resetToken)
//         .digest('hex');
//
//     console.log({ resetToken }, this.passwordResetToken);
//
//     this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//
//     return resetToken;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;