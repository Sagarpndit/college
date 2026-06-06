const Validator = require('../helper/validate');

const create = async (req, res, next) => {
    // console.log(req);
    const validationRule = {
        name: 'required|string|max:255',
        mobile: 'required|digits:10',
        password: 'required|min:6',
        userType: 'required|in:admin,staff'
    };

    await Validator.validator(req.body, validationRule, {}, (err, status) => {
        console.log(req.body);
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

const update = async (req, res, next) => {
    const validationRule = {
        name: 'required|string|max:255',
        mobile: 'required|digits:10',
        password: 'required|min:6',
        userType: 'required|in:admin,staff'
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
    create,
    update
};
