const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app");


dotenv.config({ path: './config.env' });

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
