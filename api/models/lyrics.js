const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const log = require("../initializers/logger").child({ model: "Lyric" });
const LyricSchema = new Schema({
    song: {
        type: Schema.Types.ObjectId,
        ref: "song"
    },
    likes: { type: Number, default: 0 },
    content: { type: String }
});

LyricSchema.statics.like = async id => {
    try {
        const Lyric = mongoose.model("lyric");
        log.info({ id }, "Finding lyric");
        const lyric = await Lyric.findById(io);
        ++lyric.likes;
        return lyric.save();
    } catch (err) {
        log.debug({ err }, "Error on Lyric");
        throw new Error(err);
    }
};

module.exports = mongoose.model("lyric", LyricSchema);
