
const mongoose = require("mongoose")
const { Schema } = mongoose

const listSchema = new Schema({
    mood:String,
    createdAt: { type: Date, default: Date.now },
    songs: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Song' 
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model("List", listSchema)