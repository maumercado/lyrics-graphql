const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const log = require("../initializers/logger").child({ model: "Song" });

const SongSchema = new Schema({
    title: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    lyrics: [
        {
            type: Schema.Types.ObjectId,
            ref: "lyric"
        }
    ]
});

SongSchema.statics.addLyric = async (id, content) => {
    try {
        const Lyric = mongoose.model("lyric");

        const song = await this.findById(id);
        const lyric = new Lyric({ content, song });
        song.lyrics.push(lyric);
        const [savedLyric, savedSong] = await Promise.all([
            lyric.save(),
            song.save()
        ]);
        return savedSong;
    } catch (err) {
        log.debug({ err }, "Error on addLyric");
        throw new Error(err);
    }
};

SongSchema.statics.findLyrics = async id => {
    try {
        const song = await this.findById(id).populate("lyrics");
        return song.lyrics;
    } catch (err) {
        log.debug({ err }, "Error on addLyric");
        throw new Error(err);
    }
};

module.exports = mongoose.model("song", SongSchema);
