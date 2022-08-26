const { model, Schema } = require("mongoose");

module.exports = new model(
    "Guild",
    new Schema({
        _id: Schema.Types.ObjectId,
        guildId: String,
        guildName: String,
        guildIcon: { type: String, required: false },
    }),
    "guilds"
);
