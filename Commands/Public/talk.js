const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("talk")
        .setDescription("我幫你說出來")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addStringOption(option =>
            option.setName('things')
                .setDescription('what you want me to say')
                .setRequired(true)),

    /**
     *
     * @param {CommandInteraction} interaction
     */

    execute(interaction) {
        const word = interaction.options.getString('things');
        interaction.channel.send(word);
        interaction.reply({
            content: `發送成功`,
            ephemeral: true,
        })
    },
};
