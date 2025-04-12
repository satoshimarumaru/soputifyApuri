const mongoose = require("mongoose")
const { Schema } = mongoose

const songSchema = new Schema({
    title: String,
    artist: String,
    spotifyId: String, // Spotifyの曲ID
    previewUrl: String, // 再生できるサンプルURL
    image: String, // アルバムジャケットとか
    });

module.exports = mongoose.model("Song", songSchema)