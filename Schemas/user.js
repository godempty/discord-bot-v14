const { model, Schema } = require("mongoose");

module.exports = new model(
    "User",
    new Schema({
        _id: Schema.Types.ObjectId,
        GuildId: String,
        UserId: String,
        userName: String,
        lastupdate: {type: Date, default: Date.now()},
        jointime: Date,
        money: Number,
        bank: Number,
    }),
    "users"
);
