const Validator = require('../helper/validate');

const create = async (req, res, next) => {
    const validationRule = {
        entityType: 'required|string',
        entityId: 'required|string',

        contentType: 'required|string',

        title: 'required|string|max:255',
        slug: 'required|string|max:255',

        shortDescription: 'string|max:500',
        content: 'required|string',

        seoTitle: 'string|max:255',
        seoDescription: 'string|max:500',

        status: 'numeric'
    };

    await Validator.validator(
        req.body,
        validationRule,
        {},
        (err, status) => {
            if (!status) {
                res.status(422).send({
                    response: false,
                    message: err.errors
                });
            } else {
                next();
            }
        }
    ).catch((err) => console.log(err));
};

const update = async (req, res, next) => {
    const validationRule = {
        entityType: 'required|string',
        entityId: 'required|string',

        contentType: 'required|string',

        title: 'required|string|max:255',
        slug: 'required|string|max:255',

        shortDescription: 'string|max:500',
        content: 'required|string',

        seoTitle: 'string|max:255',
        seoDescription: 'string|max:500',

        status: 'numeric'
    };

    await Validator.validator(
        req.body,
        validationRule,
        {},
        (err, status) => {
            if (!status) {
                res.status(422).send({
                    response: false,
                    message: err.errors
                });
            } else {
                next();
            }
        }
    ).catch((err) => console.log(err));
};

module.exports = {
    create,
    update
};