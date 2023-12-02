const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app");


dotenv.config({ path: './config.env' });


const url = "mongodb+srv://tester:8MfbCPJO22Vb1hgI@cluster0.lcigfwu.mongodb.net/sport_school?retryWrites=true&w=majority"
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
