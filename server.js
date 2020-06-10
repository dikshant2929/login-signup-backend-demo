const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const routes = require("./routes");
const helper = require("./utils/helper");
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Middleware
app
    .use(cors())
    .use( bodyParser.urlencoded({ extended: false })) //Body-parser 
    .use(bodyParser.json())
    .use(passport.initialize()) // Passport

// Passport config
require("./config/passport")(passport);

//Databse Initialization
require('./database')();

// Routes
app.get("/", (req, res) => {
    res.json(helper.response({ 
        message : 'Working Fine !!!'
    }))
});
app.use("/api", routes());

//Server Starting
app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));