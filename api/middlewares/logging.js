"use strict";

const util = require("util");
const uuid4 = require("uuid").v4;

module.exports = function(logger, opts) {
    opts = opts || {};

    const defaultLevel = opts.level || "info";
    const requestTimeLevel = opts.timeLimit;

    return function(ctx, next) {
        const startTime = new Date().getTime();
        const reqId = uuid4();

        logger[defaultLevel](
            {
                reqId,
                url: ctx.url,
                headers: ctx.headers,
                hostname: ctx.hostname,
                path: ctx.path,
                query: ctx.query,
                method: ctx.method.toUpperCase()
            },
            util.format("[REQUEST] %s %s", ctx.method, ctx.url)
        );

        const done = function() {
            const requestTime = new Date().getTime() - startTime;
            let localLevel = defaultLevel;

            if (requestTimeLevel && requestTime > requestTimeLevel) {
                localLevel = "warn";
            }
            logger[localLevel](
                {
                    reqId,
                    url: ctx.url,
                    headers: ctx.headers,
                    hostname: ctx.hostname,
                    path: ctx.path,
                    query: ctx.query,
                    method: ctx.method.toUpperCase(),
                    status: ctx.status,
                    timer: `${requestTime} ms`
                },
                util.format(
                    "[RESPONSE] %s %s (%s) took %s ms",
                    ctx.method,
                    ctx.originalUrl,
                    ctx.status,
                    requestTime
                )
            );
            logger[localLevel];
        };

        ctx.res.once("finish", done);
        ctx.res.once("close", done);

        return next();
    };
};
