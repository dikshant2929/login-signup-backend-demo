const mongoose = require("mongoose");
require('dotenv').config();

//Mongo Options
const configurationOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const datebaseInitialization = () => {
    // Connect to MongoDB
    mongoose
        .connect(process.env.DB_URI , configurationOptions)
        .then(() => console.log("MongoDB successfully connected"))
        .catch(err => console.log(err));
}

module.exports = datebaseInitialization;