const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Song = mongoose.model("song");
const Lyric = mongoose.model("lyric");
const log = require("../initializers/logger").child({ schema: "mutations" });
const SongType = require("./song_type");
const LyricType = require("./lyric_type");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addSong: {
            type: SongType,
            args: {
                title: { type: GraphQLString }
            },
            async resolve(parentValue, { title }) {
                try {
                    return await new Song({ title }).save();
                } catch (err) {
                    log.debug({ err }, "Error Song title mutation");
                    throw new Error(err);
                }
            }
        },
        addLyricToSong: {
            type: SongType,
            args: {
                content: { type: GraphQLString },
                songId: { type: GraphQLID }
            },
            async resolve(parentValue, { content, songId }) {
                try {
                    return await Song.addLyric(songId, content);
                } catch (err) {
                    log.debug({ err, songId }, "Error Song content mutation");
                    throw new Error(err);
                }
            }
        },
        likeLyric: {
            type: LyricType,
            args: { id: { type: GraphQLID } },
            async resolve(parentValue, { id }) {
                try {
                    return await Lyric.like(id);
                } catch (err) {
                    log.debug({ err }, "Error Like lyric mutation");
                    throw new Error(err);
                }
            }
        },
        deleteSong: {
            type: SongType,
            args: { id: { type: GraphQLID } },
            async resolve(parentValue, { id }) {
                try {
                    return Song.remove({ _id: id });
                } catch (err) {
                    log.debug({ err }, "Error delete song mutation");
                    throw new Error(err);
                }
            }
        }
    }
});

module.exports = mutation;
