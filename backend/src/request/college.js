const Validator = require('../helper/validate');

const create = async (req, res, next) => {
    const validationRule = {
        name: 'required|string|max:255',
        slug: 'required|string|max:255',
        collegeType: 'required|string|max:100',
        city: 'required|string|max:100',
        state: 'required|string|max:100',

        shortName: 'string|max:50',
        establishedYear: 'numeric',
        affiliation: 'string|max:255',
        accreditation: 'string|max:255',
        website: 'string|max:255',

        seoTitle: 'string|max:255',
        seoDescription: 'string|max:500',

        status: 'numeric'
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

const update = async (req, res, next) => {
    const validationRule = {
        name: 'required|string|max:255',
        slug: 'required|string|max:255',
        collegeType: 'required|string|max:100',
        city: 'required|string|max:100',
        state: 'required|string|max:100',

        shortName: 'string|max:50',
        establishedYear: 'numeric',
        affiliation: 'string|max:255',
        accreditation: 'string|max:255',
        website: 'string|max:255',

        seoTitle: 'string|max:255',
        seoDescription: 'string|max:500',

        status: 'numeric'
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