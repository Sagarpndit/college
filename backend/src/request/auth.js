const Validator = require('../helper/validate');

const login = async (req, res, next) => {
    const validationRule = {
        email: 'required',
        password: 'required|min:6',
    };

    await Validator.validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(422).send({
                response: false,
                message: err.errors
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};

const requestForgetPassword = async (req, res, next) => {
    const validationRule = {
        email: 'required',
    };

    await Validator.validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(422).send({
                response: false,
                message: err.errors
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};

const verifyForgetPassword = async (req, res, next) => {
    const validationRule = {
        password: 'required|min:6',
        confirmPassword: 'required|same:password',
        otp: 'required|min:6|max:6',
    };

    await Validator.validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(422).send({
                response: false,
                message: err.errors
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};

const changePassword = async (req, res, next) => {
    const validationRule = {
        oldPassword: 'required|different:password',
        password: 'required|min:6',
        confirmPassword: 'required|same:password'
    };

    await Validator.validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(422).send({
                response: false,
                message: err.errors
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};

const userProfile = async (req, res, next) => {
    const validationRule = {
        name: 'required|string|max:255',
        email: 'required|email',
        mobile: 'required|digits:10',
    };

    await Validator.validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(422).send({
                response: false,
                message: err.errors
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};

module.exports = {
    login,
    userProfile,
    changePassword,
    requestForgetPassword,
    verifyForgetPassword
};
