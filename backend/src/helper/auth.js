const jwt = require('jsonwebtoken');
const config = require('../../config');

function verifyToken(req, res, next) {
    // const token = req.cookies ? req.cookies.token : null // token in cookie
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token.replace('Bearer ', ''), config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }
        console.log(decoded);
        req.userId = decoded.id;
        req.userType = decoded.userType;
        req.parentId = decoded.parentId;
        next();
    });
}

module.exports = verifyToken;
