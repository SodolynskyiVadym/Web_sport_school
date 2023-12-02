const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app");


dotenv.config({ path: './config.env' });

// const urlTest = "mongodb+srv://vadym:3QMI9VE2gEDQ8nAS@cluster0.lcigfwu.mongodb.net/?retryWrites=true&w=majority"
const url = process.env.MONGO_DB_URL
const connParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
mongoose.connect(url, connParams)
    .then(() => console.log("Mongo connections"))


app.listen(8000, () => {
    console.log("App running on port 8000...");
});
