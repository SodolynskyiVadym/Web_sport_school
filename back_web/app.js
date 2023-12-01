const express = require('express');
const path = require("path");
const morgan = require('morgan');
const AppError = require('./utils/appError');
// const rateLimit = require("express-rate-limit");
const mongo_sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const errorHandler = require("./controllers/errorController");
const groupRouter = require("./routes/groupRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const cors = require("cors");


const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan('dev'));


app.use(mongo_sanitize());

app.use(express.json());

// app.use(hpp({
//   whitelist: [
//     "duration",
//     'maxGroupSize',
//     'ratingsAverage',
//     'ratingsQuantity',
//     'price',
//     'priceDiscount',
//     'startDates',
//   ]
// }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(cors());


app.use("/groups", groupRouter);
app.use("/users", userRouter);
app.use("/reviews", reviewRouter);


app.use(errorHandler);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find this URL on this server!`, 404));
});

module.exports = app;
