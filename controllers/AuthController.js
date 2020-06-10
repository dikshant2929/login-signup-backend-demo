const User = require("../models/User");

const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

const jwt = require("jsonwebtoken");

const { secret } = require("../config/keys");
const helper = require("../utils/helper");


exports.login = (req, res, next) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.json(helper.response({
            error: errors
        }));
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {

        // Check if user exists
        if (!user) {
            return res.json(helper.response({
                error: new Error('Invalid Email ID or Password'),
                message: 'Invalid Email ID or Password'
            }));
        }

        const isMatched = helper.compareSync(password, user.password);

        if (!isMatched) {
            return res.json(helper.response({ error: new Error('Invalid Email ID or Password'), message: 'Invalid Email ID or Password' }));
        }

        // User matched
        // Create JWT Payload
        const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        };

        // Sign token
        jwt.sign( payload, secret, {
                expiresIn: 31556926 // 1 year in seconds
            },(err, token) => {
                res.json(helper.response({ result: "Bearer " + token, keyTitle: 'token' }));
            }
        );
    });
}

exports.register = (req, res, next) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.json(helper.response({ error: errors }));
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.json(helper.response({
                error: new Error('Email already exist'),
                message: 'Email already exist'
            }));
        } else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            });

            newUser.password = helper.createHashPassword(newUser.password);
            newUser
                .save()
                .then(user => res.json(helper.response({
                    result: user
                })))
                .catch(err => res.json(helper.response({
                    error: err
                })));
        }
    });
}