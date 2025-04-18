const mongoose = require("mongoose")
const { Schema } = mongoose

const favoriteSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    albumImage:{
        type:String,
        required:true
    },
    URL:{
        type:String,
        required:true
    },
    trackId:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("Favorite", favoriteSchema)