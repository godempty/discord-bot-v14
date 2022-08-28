const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("我好弱")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     *
     * @param {CommandInteraction} interaction
     */

    execute(interaction) {
        interaction
            .reply({ content: "Pong!", ephemeral: true })
            .catch((err) => console.log(err));
    },
};
