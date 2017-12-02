const Router = require("koa-router");
const graphqlHTTP = require("koa-graphql");
const schema = require("../schema/schema");

const router = new Router();

router.all(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

module.exports = router;
