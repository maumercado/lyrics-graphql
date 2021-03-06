const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require("./song_type");
const LyricType = require("./lyric_type");
const Lyric = require("../models/lyrics");
const Song = require("../models/song");
const log = require("../initializers/logger").child({
    schema: "Root query type"
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        songs: {
            type: new GraphQLList(SongType),
            async resolve() {
                try {
                    log.info("Find all songs");
                    const songs = await Song.find({});
                    return songs;
                } catch (err) {
                    log.debug({ err }, "Error finding song");
                    throw new Error(err);
                }
            }
        },
        song: {
            type: SongType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(parentValue, { id }) {
                try {
                    return await Song.findById(id);
                } catch (err) {
                    log.debug({ err, id }, "Error finding song");
                    throw new Error(err);
                }
            }
        },
        lyric: {
            type: LyricType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(parnetValue, { id }) {
                try {
                    return await Lyric.findById(id);
                } catch (err) {
                    log.debug({ err, id }, "Error finding lyric");
                    throw new Error(err);
                }
            }
        }
    })
});

module.exports = RootQuery;
