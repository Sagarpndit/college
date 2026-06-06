const { isEqual } = require('lodash');
const College = require('../models/College');
const validator = require('../helper/validate');
const pagination = require('../helper/pagination');
const common = require('../helper/common');
const crypto = require('crypto');

module.exports = {
    async getList(req, res) {
        try {
            let { page, per_page, search } = req.query;

            const { limit, offset } = pagination.getPagination(page, per_page);

            let filter = {};

            if (search) {
                filter.name = {
                    $regex: search,
                    $options: 'i'
                };
            }

            const total = await College.countDocuments(filter);

            const rows = await College.find(filter)
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(limit);

            const data = pagination.getPagingData(
                {
                    count: total,
                    rows
                },
                page,
                limit
            );

            return res.status(200).send({
                data,
                response: true,
                message: 'College data list!'
            });
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async getById(req, res) {
        try {
            const college = await College.findById(req.params.id);

            if (!college) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found!'
                });
            }

            return res.status(200).json({
                data: college,
                response: true,
                message: 'College found successfully!'
            });
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async create(req, res) {
        try {
            const {
                name,
                slug,
                shortName,
                collegeType,
                city,
                state,
                establishedYear,
                affiliation,
                accreditation,
                website,
                logo,
                bannerImage,
                seoTitle,
                seoDescription,
                status
            } = req.body;

            const checkCollege = await College.findOne({
                slug: slug
            });

            if (checkCollege) {
                return validator.custormValidator(res, {
                    status: 422,
                    filed: 'slug',
                    message: 'College slug already exists'
                });
            }

            await College.create({
                name,
                slug,
                shortName,
                collegeType,
                city,
                state,
                establishedYear,
                affiliation,
                accreditation,
                website,
                logo,
                bannerImage,
                seoTitle,
                seoDescription,
                status
            });

            return res.status(200).json({
                response: true,
                message: 'College created successfully'
            });
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async createContent(req, res) {
        try {
            let { hash = crypto.randomBytes(8).toString('hex'), type, content } = req.body;
            const findCollege = await College.findById(req.params.id);

            if (!findCollege) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found'
                });
            }

            findCollege.content.push({
                hash,
                type,
                content
            });

            await findCollege.save();

            return res.status(201).json({
                response: true,
                message: 'Content block created'
            });

        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }


    },

    async updateContent(req, res) {
        try {
            let { type, content } = req.body;
            const findCollege = await College.findById(req.params.id);
            const index = findCollege.content.findIndex(
                item => item.hash === req.params.hash
            );

            if (index === -1) {
                return res.status(404).json({
                    response: false,
                    message: 'Content block not found'
                });
            }

            findCollege.content[index] = {
                hash: req.params.hash,
                type,
                content
            };

            await findCollege.save();
            return res.status(200).json({
                response: true,
                message: 'Content block updated'
            });

        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }


    },

    async deleteContent(req, res) {
        try {

            const findCollege = await College.findById(req.params.id);

            if (!findCollege) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found'
                });
            }

            findCollege.content = findCollege.content.filter(
                item => item.hash !== req.params.hash
            );

            await findCollege.save();

            return res.status(200).json({
                response: true,
                message: 'Content block deleted successfully'
            });

        } catch (error) {
            return res.status(500).json({
                response: false,
                message: error.message
            });
        }
    },

    async reorderContent(req, res) {
        try {
            const { content } = req.body;

            await College.findByIdAndUpdate(
                req.params.id,
                {
                    content
                }
            );

            return res.status(200).json({
                response: true,
                message: `Block moved successfully`
            });
        } catch (error) {
            return res.status(500).json({
                response: false,
                message: error.message
            });
        }
    },

    async update(req, res) {
        try {
            const findCollege = await College.findById(req.params.id);

            if (!findCollege) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found!'
                });
            }

            const { slug } = req.body;

            if (slug && !isEqual(findCollege.slug, slug)) {
                const checkSlug = await College.findOne({
                    slug: slug
                });

                if (checkSlug) {
                    return validator.custormValidator(res, {
                        status: 422,
                        filed: 'slug',
                        message: 'College slug already exists'
                    });
                }
            }

            await College.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

            return res.status(200).json({
                response: true,
                message: 'College updated successfully'
            });
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async delete(req, res) {
        try {
            await College.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                response: true,
                message: 'College deleted successfully'
            });
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async fetchDropDown(req, res) {
        try {
            const colleges = await College.find(
                { status: 1 },
                {
                    name: 1
                }
            ).sort({
                name: 1
            });

            return res.status(200).json({
                data: colleges,
                response: true,
                message: 'College dropdown list!'
            });
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    }
};