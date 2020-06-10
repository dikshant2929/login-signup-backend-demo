const router = require("express").Router();
const { AuthController } = require("../../controllers");

module.exports = () => {
    
    router
        .route('/login')
        .post(AuthController.login);

    router
        .route('/register')
        .post(AuthController.register);
    
    return router;
};
