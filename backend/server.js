const app = require("./src/app");
const config = require("./config");
const dbConnect = require("./config/database");
const express = require('express')
dbConnect();

app.app.use('/storage', express.static('storage'));


app.app.listen(config.PORT, () => {
    console.log(`http://localhost:${config.PORT}`);
})