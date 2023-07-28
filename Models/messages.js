const mongoose = require("mongoose")

module.exports = mongoose.model("Messages", mongoose.Schema({
    id : String,
    task : String
}))