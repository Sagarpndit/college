const app = require("./src/app");
const config = require("./config");
const dbConnect = require("./config/database");

dbConnect();

app.app.listen(config.PORT, () => {
    console.log(`http://localhost:${config.PORT}`);
})