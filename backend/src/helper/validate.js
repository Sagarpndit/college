const Validator = require('validatorjs');
const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const customValidator = (res, object) => {
    res.status(object.status).send({
        response: false,
        message: object.filed
            ? {
                [object.filed]: [object.message]
            }
            : object.message
    });
};

module.exports = {
    validator,
    customValidator
};
