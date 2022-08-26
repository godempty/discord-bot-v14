const { Client } = require("discord.js");
const { connect } = require("mongoose");
const { database } = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     *
     * @param {Client} client
     */
    execute(client) {
        console.log(`機器人登錄為 : ${client.user.username}`);
        client.user.setActivity(`工作於 ${client.guilds.cache.size} 個伺服器`);

        // MongoDB Database Connection
        (async () => {
            await connect(database).catch(console.error);
        })();
    },
};
