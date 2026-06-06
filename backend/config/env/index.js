require('dotenv').config();
class Config {
    constructor() {
        this.PORT = process.env.PORT;
        this.API_BASE = '/api';
        this.DATABASE_URL = process.env.DATABASE_URL;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.COOKIE_SECURE = true;
        this.COOKIE_SAME_SITE = 'None';
        this.BASE_URL = process.env.BASE_URL;
    }
}

module.exports = new Config();
