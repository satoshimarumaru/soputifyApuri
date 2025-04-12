
const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    username:String,
    lists:[{
        type:Schema.Types.ObjectId,
        ref:"List"
    }]
})

module.exports = mongoose.model("User", userSchema)