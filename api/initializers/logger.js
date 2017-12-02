const bunyan = require("bunyan");
const name = require("../../package.json").name;

module.exports = bunyan.createLogger({
    name,
    serializers: bunyan.stdSerializers
});
