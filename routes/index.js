const router = require("express").Router();
const users = require('./api/users');

module.exports = () => {

    //Setting Up User Routes
    router.use('/users', users())
    
    return router;
};