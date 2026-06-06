const saltRound = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config");
const User = require("../models/User");
const validator = require('../helper/validate');
const { isNull } = require('lodash');

const generateAuthorizationToken = (user) => {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
    return token;
}

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const findUser = await User.findOne({ email: email });
            if (findUser) {
                if (findUser.status === 1) {
                    const verifyPassword = await bcrypt.compare(password, findUser.password);
                    if (verifyPassword) {
                        const token = generateAuthorizationToken(findUser);
                        return res.status(200).send({
                            response: true,
                            message: 'You are succesfully logged in',
                            data: { token: token, profile: findUser }
                        });
                    } else {
                        return validator.customValidator(res, {
                            status: 422,
                            filed: 'password',
                            message: 'Your password is invalid!'
                        });
                    }
                } else {
                    return validator.customValidator(res, {
                        status: 422,
                        message: 'Your acount hasbeen disabled due to reason please connect admin!'
                    });
                }
            } else {
                return validator.customValidator(res, {
                    status: 422,
                    filed: 'email',
                    message: 'Your email is invalid!'
                });
            }
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async changePassword(req, res) {
        const { oldPassword, password } = req.body;
        const findUser = await User.findById(req.userId);
        if (findUser) {
            const verifyPassword = await bcrypt.compare(oldPassword, findUser.password);
            if (verifyPassword) {
                const bcryptPassword = await bcrypt.hash(password, saltRound);
                await User.findByIdAndUpdate(req.userId, { password: bcryptPassword }, { new: true });
                return res.status(200).send({
                    response: true,
                    message: 'Password Changed Succesfully.'
                });
            } else {
                return validator.customValidator(res, {
                    status: 422,
                    filed: 'oldPassword',
                    message: 'Your old password is invalid!'
                });
            }
        } else {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async requestForgetPassword(req, res) {

    },

    async verifyForgetPassword(req, res) {
        try {
            const { password, otp, email } = req.body;
            const findUser = await User.findOne({ where: { email: email } });
            if (findUser) {
                if (findUser.otp == Number(otp)) {
                    const bcryptPassword = await bcrypt.hash(password, saltRound);
                    await User.findByIdAndUpdate(findUser.id, { password: bcryptPassword, otp: null }, { new: true });

                    return res.status(200).send({
                        response: true,
                        message: 'New password updated successfully'
                    });
                } else {
                    return validator.customValidator(res, {
                        status: 422,
                        filed: 'otp',
                        message: 'Your otp is invalid'
                    });
                }
            } else {
                return validator.customValidator(res, {
                    status: 422,
                    filed: 'email',
                    message: 'Your email address is invalid'
                });
            }
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    },

    async userProfile(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (!isNull(user)) {
                if (user.status === 1) {
                    // if (!isNull(findUser.profileImage)) {
                    //     findUser.profileImage = `${config.BASE_URL}/${findUser.profileImage}`;
                    // }
                    return res.status(200).json({
                        data: user,
                        response: true,
                        message: 'User profile'
                    });
                } else {
                    return res.status(401).send({
                        auth: false,
                        message: 'Your acount hasbeen disabled due to reason please connect admin!'
                    });
                }
            }
        } catch (error) {
            res.status(500).send({
                response: false,
                message: error.message
            });
        };
    },

    async updateUserProfile(req, res) {
        try {
            let { name, mobile, userType, profileImage } = req.body;
            const findUser = await User.findOne({ where: { email: email, userType: userType } });

            // if (!isUndefined(req.files.image)) {
            //     if (!isNull(findUser.profileImage)) {
            //         fileUpload.deleteStorageFile(findUser.profileImage);
            //     }

            //     profileImage = fileUpload.setDestinationPath(req.files.image[0], 'user');
            // }

            if (!findUser || findUser.id == req.userId) {
                await User.findByIdAndUpdate(req.userId,
                    {
                        name,
                        email,
                        mobile,
                        profileImage,
                        fullAddress,
                    }, { new: true, timestamps: true });

                return res.status(200).send({
                    response: true,
                    message: 'User updated succesfully.'
                });
            } else {
                return validator.custormValidator(res, {
                    status: 422,
                    filed: 'email',
                    message: ' Email Id is already registred.'
                });
            }
        } catch (error) {
            return res.status(500).send({
                response: false,
                message: error.message
            });
        }
    }
} 