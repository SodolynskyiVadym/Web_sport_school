const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app");


dotenv.config({ path: './config.env' });


mongoose.connect("mongodb://127.0.0.1:27017/sport_school", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => console.log("MongoDB connection successful!"));


app.listen(8000, () => {
    console.log(`App running on port 8000...`);
});
