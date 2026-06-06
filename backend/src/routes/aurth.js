var express = require('express');
var router = express.Router();

// Request
const userRequest = require('../request/user');
const collegeRequest = require('../request/college');

// Controller
const authController = require('../controllers/auth')
const collegeController = require('../controllers/college')

/* User */
// router.post('/user', userRequest.create, userController.create);
// router.get('/user/:id', userController.getById);
router.get('/user-profile', authController.userProfile);

/* College */
router.post('/college', collegeRequest.create, collegeController.create);
router.put('/college/:id', collegeRequest.update, collegeController.update);
router.delete('/college/:id', collegeController.delete);
router.get('/college', collegeController.getList);
router.get('/college/:id', collegeController.getById);
router.get('/college-dropdown', collegeController.fetchDropDown);


module.exports = router;