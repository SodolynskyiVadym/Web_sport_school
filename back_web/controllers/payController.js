const Group = require("../models/groupModel");
const catchAsync = require("../utils/catchAsync");
const {calculateTotal} = require("../utils/calculateTotal");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Pay = require("../models/paymentsModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    const group = await Group.findById(req.params.groupID).populate({
        path: "priceID",
        select: "price discount"
    });

    const user = await User.findById(req.params.userID);


    if (!group || !user) return next(new AppError("Incorrect data", 403));
    console.log(group)
    console.log("--------------------------------")
    console.log(user)
    console.log("-----------------------------------")
    console.log("Price" + await calculateTotal(group))

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                unit_amount: await calculateTotal(group),
                product_data: {
                    description: `${group.description}`,
                    name: `${group.name.toUpperCase()}`,
                    images: [`../images/${group.kindSport}.jpeg`],
                },
            },
            quantity: 1,
        }],
        mode: "payment",
        success_url: `http://localhost:8080/join/${group._id}/${user._id}`,
        cancel_url: 'http://localhost:8080/',
        payment_method_types: ["card"],
        // email: user.email
    });

    console.log(session)

    await Pay.create({
        userID: user._id,
        groupID: group._id,
        price: await calculateTotal(group)
    });

    res.status(200)
        .json({
            success: "success",
            session
        });
});