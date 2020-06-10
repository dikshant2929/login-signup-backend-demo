const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;
const mongoose = require('mongoose');

exports.response = ({error, result, keyTitle = 'data', message}) => {
    return error 
        ? (error.name === 'MongoError' && error.code === 11000 
            ? { status: false, error, msg: error.errmsg } 
            : { status: false, error, msg: (message || 'Something went wrong !!!') }) 
        : 
            { status: true, [keyTitle]: result, msg: (message || 'Successful !!!')}
};

exports.createHashPassword = (plainPasswordText) => bcrypt.hashSync(plainPasswordText, SALT_ROUNDS);

exports.compareSync = (plainPasswordText, hashPassword) => bcrypt.compareSync(plainPasswordText, hashPassword);

exports.getMongooseId = (plainId) => mongoose.Types.ObjectId(plainId);