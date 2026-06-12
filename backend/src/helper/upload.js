const fs = require('fs');
const multer = require('multer');
const { isUndefined } = require('lodash');
const validator = require('../helper/validate');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp-file');
    },
    filename: function (req, file, cb) {
        const mimetype = file.mimetype.split('/').pop();
        const updatedMimeType = ['jpeg', 'png', 'webp'].includes(mimetype) ? 'jpg' : mimetype;

        cb(null, Date.now() + '.' + updatedMimeType);
    }
});

const upload = multer({
    storage: storage
});

const uploadFile = upload.fields([
    { name: 'zip', maxCount: 1 },
    { name: 'csv', maxCount: 1 },
    { name: 'docx', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'image', maxCount: 1 },
    { name: 'barCode', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'fatherPhoto', maxCount: 1 },
    { name: 'motherPhoto', maxCount: 1 }
]);

const setDestinationPath = (file, allocate) => {
    let destinationPath = '';
    const currentPath = file.path;
    const destinationDirectory = 'storage/' + allocate + '/';
    if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory, { recursive: true });
        destinationPath = destinationDirectory + file.filename;
    } else {
        destinationPath = destinationDirectory + file.filename;
    }
    fs.rename(currentPath, destinationPath, function (err) { });
    return destinationPath;
};

const deleteStorageFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) return;
    });
};

const checkFileValidation = (req, res, next) => {
    let { fileType, required } = res.locals;

    const returnValidation = (filed, message) => {
        validator.custormValidator(res, {
            status: 422,
            filed: filed,
            message: message
        });
    };

    // Required
    if (required.includes('image')) {
        if (isUndefined(req.files) || isUndefined(req.files.image)) {
            return returnValidation('image', 'The image filed is required');
        }
    }

    // File Typechecker
    if (fileType.includes('image')) {
        if (!isUndefined(req.files) && !isUndefined(req.files.image)) {
            if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(req.files.image[0].mimetype)) {
                return returnValidation('image', 'The image filed allowed only .png, .jpg, .jpeg and .webp format');
            }
        }
    }

    next();
};

module.exports = {
    upload,
    uploadFile,
    setDestinationPath,
    deleteStorageFile,
    checkFileValidation
};
