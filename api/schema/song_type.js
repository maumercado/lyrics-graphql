const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require("./lyric_type");
const log = require("../initializers/logger").child({ schema: "Song" });
const Song = require("../models/song");

const SongType = new GraphQLObjectType({
    name: "SongType",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        lyrics: {
            type: new GraphQLList(LyricType),
            async resolve(parentValue) {
                try {
                    return await Song.findLyrics(parentValue.id);
                } catch (err) {
                    log.debug(
                        { err, id: parentValue.id },
                        "Error finding song by lyric"
                    );
                    throw new Error(err);
                }
            }
        }
    })
});

module.exports = SongType;
