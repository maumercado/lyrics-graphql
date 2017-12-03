const mongoose = require("mongoose");
const config = require("../../config/default");
const log = require("./logger").child({ initializer: "db" });

const MONGO_URL = config.db.url;

if (!MONGO_URL) {
    throw new Error("You must provide a MongoLab URI");
}

module.exports = initDb = async () => {
    mongoose.Promise = global.Promise;

    try {
        const con = await mongoose.connect(MONGO_URL, { useMongoClient: true });
        let { host, port, user, name, options, readyState } = con;
        log.info(
            { host, port, user, name, options, readyState },
            "connected to mongo"
        );
    } catch (err) {
        log.debug({ err }, "Error connecting to mongo");
        throw new Error(err);
    }
};
