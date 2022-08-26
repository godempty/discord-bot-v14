const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("for test events")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     *
     * @param {CommandInteraction} interaction
     */

    execute(interaction, client) {
        client.emit('guildMemberAdd', interaction.member);
        interaction.reply({
            content: `done`,
            ephemeral: true,
        })
    },
};
