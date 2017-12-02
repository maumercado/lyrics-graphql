const app = require("./api/index");
const config = require("./config/default");

app();
console.log(`App listening on port ${config.server.port}`);
