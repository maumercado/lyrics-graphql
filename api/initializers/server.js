const Koa = require("koa");
const path = require("path");
const koaLogger = require("koa-bunyan");
const Boom = require("boom");
const logger = require("./logger");
const config = require("../../config/default");
const serve = require("koa-static");
const router = require("../routes");
const db = require("../initializers/db");
// const models = require("../models");

module.exports = initServer = () => {
    const app = new Koa();
    db();

    app.use(
        koaLogger(logger, {
            // which level you want to use for logging?
            // default is info
            level: "debug",
            // this is optional. Here you can provide request time in ms,
            // and all requests longer than specified time will have level 'warn'
            timeLimit: 100
        })
    );

    const publicFiles = serve(path.join(__dirname, "../../client/build"));
    publicFiles._name = "public";

    app.use(router.routes());
    app.use(
        router.allowedMethods({
            throw: true,
            notImplemented: () => new Boom.notImplemented(),
            methodNotAllowed: () => new Boom.methodNotAllowed()
        })
    );

    app.use(publicFiles);

    app.listen(config.server.port);
};
