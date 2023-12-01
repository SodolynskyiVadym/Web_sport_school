const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app");


dotenv.config({ path: './config.env' });

// const urlTest = 'mongodb+srv://vadym:GrJNFNfPmVLX2c8l@cluster0.lcigfwu.mongodb.net/?retryWrites=true&w=majority'
const url = "mongodb+srv://vadym:GrJNFNfPmVLX2c8l@cluster0.lcigfwu.mongodb.net/sport_school?retryWrites=true&w=majority"
const connParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
mongoose.connect(url, connParams).then(() => console.log("Mongo connections"))


app.listen(8000, () => {
    console.log("App running on port 8000...");
});
