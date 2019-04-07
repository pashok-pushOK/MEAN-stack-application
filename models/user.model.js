const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let userEmailChecker = (email) => {
    if (!email) return false;
    else if (email.length < 5 || email.length > 30) return false;
    else return true;
};

let userEmailValid = (email) => {
    if (!email) return false;
    else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

let userNameChecker = (name) => {
    if(!name) return false;
    else {
        if(name.length < 3 || name.length > 20) return false;
        else return true;
    }
};

let userNameValid = (name) => {
    if(!name) return false;
    else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(name);
    }
};

let userPasswordLenghtChecker = (password) => {
    if(!password) return false;
    else {
        if(password.length < 8 || password.length > 30) return false;
        else return true;
    }
};

let userPasswordValid = (password) => {
    if(!password) return false;
    else {
        const regExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
        return regExp.test(password);
    }
};

let userCityLengthChecker = (city) => {
    if(!city) return false;
};

let userCityValid = (city) => {
    if(!city) return false;
    else {
        const regExp = new RegExp(/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/);
        return regExp.test(city);
    }
};

const emailValidators = [
    {validator: userEmailChecker, message: 'E-mail must be at least 5 characters and but no more than 30'},
    {validator: userEmailValid, message: 'E-mail is not valid!'}
];

const userNameValidators = [
    {validator: userNameChecker, message: 'User Name must be at least 3 characters and but no more than 20'},
    {validator: userNameValid, message: 'User Name must not have any special characters!'}
];

const userPasswordValidators = [
    {validator: userPasswordLenghtChecker, message: 'Password length must be more than 8 characters'},
    {validator: userPasswordValid, message: 'Password must not have any special characters'}
];

const userCityValidators = [
    {validator: userCityLengthChecker, message: 'Field City must not be empty!'},
    {validator: userCityValid, message: 'Enter a valid City!'}
];

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        validate: userNameValidators
    },
    userPassword: {
        type: String,
        required: true,
        validate: userPasswordValidators
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators
    },
    userCity: {
        type: String,
        required: true,
        validate: userCityValidators
    },
    userAdress: {
        type: String,
        default: ''
    }
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('userPassword')) return next();

    bcrypt.hash(this.userPassword, null, null, (err, hash) => {
        if (err) return next(err);
        this.userPassword = hash;
        next();
    });
});

exports.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.userPassword);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
