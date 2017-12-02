const mongoose = require("mongoose");
const graphql = require("graphql");
const log = require("../initializers/logger").child({ schema: "LyricType" });

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;

const Lyric = require("../models/lyrics");

const LyricType = new GraphQLObjectType({
    name: "LyricType",
    fields: () => ({
        id: { type: GraphQLID },
        likes: { type: GraphQLInt },
        content: { type: GraphQLString },
        song: {
            type: require("./song_type"),
            async resolve(parentValue) {
                try {
                    const lyric = await Lyric.findById(parentValue).populate(
                        "song"
                    );
                    log.info({ lyric }, "found lyric");
                    return lyric.song;
                } catch (err) {
                    log.debug({ err }, "Error getting lyric");
                }
            }
        }
    })
});

module.exports = LyricType;
