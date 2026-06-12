var express = require('express');
var router = express.Router();

const fileUploader = require('../helper/upload');


// Request
const userRequest = require('../request/user');
const collegeRequest = require('../request/college');

// Controller
const authController = require('../controllers/auth')
const collegeController = require('../controllers/college')

/* User */
router.get('/user-profile', authController.userProfile);

/* File Upload */
router.post('/upload-single', fileUploader.upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send({ message: 'File uploaded successfully', file: req.file });
});

router.post('/upload-multiple', fileUploader.upload.array('files', 6), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    res.send({ message: 'Files uploaded successfully', files: req.files });
});


/* College */
router.post('/college', collegeRequest.create, collegeController.create);
router.patch('/college/:id', collegeRequest.update, collegeController.update);
router.delete('/college/:id', collegeController.delete);
router.get('/college', collegeController.getList);
router.get('/college/:id', collegeController.getById);
router.get('/college-dropdown', collegeController.fetchDropDown);

router.patch('/template/:id', collegeController.createContent);
router.patch('/template/:id/content/:hash', collegeController.updateContent);
router.delete('/template/:id/content/:hash', collegeController.deleteContent);
router.patch('/template/:id/reorder', collegeController.reorderContent);

router.patch('/template-image/:id', collegeController.createImageContent);
router.delete('/template-image/:id/content/:hash', collegeController.deleteImageContent);

/* */

module.exports = router;