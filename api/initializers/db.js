const mongoose = require("mongoose");
const config = require("../../config/default");
const log = require("./logger").child({ initializer: "db" });

const MONGO_URI = config.db.url;

if (!MONGO_URI) {
    throw new Error("You must provide a MongoLab URI");
}

module.exports = initDb = () => {
    mongoose.Promise = global.Promise;

    mongoose.connection.once("open", () => log.info("Initializing Mongo"));
    mongoose.connection.on("error", err => log.debug({ err }, "Mongo Error"));
};
