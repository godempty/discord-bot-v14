const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
} = require("discord.js");
const { loadEvents } = require("../../Handlers/eventHandler");
const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("重新載入")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((options) =>
            options.setName("events").setDescription("重新載入事件")
        )
        .addSubcommand((options) =>
            options.setName("commands").setDescription("重新載入指令")
        ),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */

    execute(interaction, client) {
        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case "events": {
                client.removeAllListeners();
                loadEvents(client);
                interaction.reply({
                    content: "重新載入事件完成",
                    ephemeral: true,
                });
                break;
            }
            case "commands": {
                loadCommands(client);
                interaction.reply({
                    content: "重新載入指令完成",
                    ephemeral: true,
                });
                break;
            }
        }
    },
};
