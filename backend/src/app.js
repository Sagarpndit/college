const express = require('express');
const cors = require('cors');
const config = require("../config");
const auth = require('./helper/auth');
const aurthRoutes = require('./routes/aurth');
const unauthRoutes = require('./routes/unauth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // https://github.com/expressjs/cors

app.all(new RegExp(`^${config.API_BASE}/.*`), (req, res, next) => {
    const requestPath = req.path;
    if (requestPath.includes('/unauth/')) {
        return next();
    }
    auth(req, res, next);
});

app.use(`${config.API_BASE}/unauth`, unauthRoutes);
app.use(`${config.API_BASE}`, aurthRoutes);

module.exports = {
    app,
    express
};