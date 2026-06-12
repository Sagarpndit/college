const { isEqual } = require('lodash');
const College = require('../models/College');
const validator = require('../helper/validate');
const pagination = require('../helper/pagination');
const fileUploader = require('../helper/upload');
const common = require('../helper/common');
const moment = require('moment');

const crypto = require('crypto');

const bannerImagePath = `college/${moment().format('YYYY')}/${moment().format('MM')}/${moment().format('DD')}`;

module.exports = {
    async getList(req, res) {
        try {
            let { page, per_page, search } = req.query;

            const { limit, offset } = pagination.setPagination(page, per_page);

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

            const data = pagination.getPaginatedData(
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
                cityId,
                stateId,
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

            if (typeof bannerImage === 'object') {
                bannerImage = await fileUploader.setDestinationPath(bannerImage, bannerImagePath);
            }

            await College.create({
                name,
                slug,
                shortName,
                collegeType,
                cityId,
                stateId,
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
            let { hash = crypto.randomBytes(8).toString('hex'), content, name } = req.body;
            const findCollege = await College.findById(req.params.id);

            if (!findCollege) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found'
                });
            }

            findCollege.content.push({
                hash,
                content,
                name
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
            let { content, name } = req.body;
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
                content,
                name
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

    async createImageContent(req, res) {
        try {
            let { hash, image } = req.body;
            const findCollege = await College.findById(req.params.id);

            if (!findCollege) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found'
                });
            }

            if (!findCollege.content.find((value, idx) => value.hash === hash)) {
                return res.status(400).json({
                    success: false,
                    message: "Section hash not found"
                });
            }

            if (typeof image === 'object') {
                image = await fileUploader.setDestinationPath(image, bannerImagePath);
            }

            findCollege.image.push({
                hash,
                image,
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

    async deleteImageContent(req, res) {
        try {

            const findCollege = await College.findById(req.params.id);

            if (!findCollege) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found'
                });
            }

            findCollege.image = findCollege.image.filter(
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

    async update(req, res) {
        try {
            const college = await College.findById(req.params.id);

            if (!college) {
                return res.status(404).json({
                    response: false,
                    message: 'College not found!'
                });
            }

            const {
                slug, bannerImage
            } = req.body;

            // Check slug uniqueness
            if (slug && !isEqual(college.slug, slug)) {
                const existingSlug = await College.findOne({
                    slug
                });

                if (existingSlug) {
                    return validator.custormValidator(res, {
                        status: 422,
                        filed: 'slug',
                        message: 'College slug already exists'
                    });
                }
            }

            const updateData = {
                ...req.body
            };

            // Handle banner image upload
            if (typeof bannerImage === 'object') {
                const bannerPath =
                    await fileUploader.setDestinationPath(
                        bannerImage,
                        'bannerImagePath'
                    );

                updateData.bannerImage = bannerPath;

                // Delete old banner
                if (college.bannerImage) {
                    fileUploader.deleteStorageFile(
                        college.bannerImage
                    );
                }
            }

            await College.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true
                }
            );

            return res.status(200).json({
                response: true,
                message: 'College updated successfully'
            });

        } catch (error) {
            return res.status(500).json({
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