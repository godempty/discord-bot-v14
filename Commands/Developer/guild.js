const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
} = require("discord.js");
const mongoose = require("mongoose");

const Guild = require("../../Schemas/guild");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("guild")
        .setDescription("傳送位於資料庫的伺服器資訊")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     *
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        const { guild } = interaction;
        let guildProfile = await Guild.findOne({
            guildId: guild.id,
        });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildId: guild.id,
                guildName: guild.name,
                guildIcon: guild.iconURL() ? guild.iconURL() : "無",
            });

            await guildProfile.save().catch(console.error);
            await interaction.channel.send({
                content: `伺服器資訊尚未加入資料庫，請稍等`,
            });
            await interaction.reply({
                content: `伺服器名稱 : ${guildProfile.guildName}\n伺服器 ID : ${guildProfile.guildId}`,
            });
            console.log(guildProfile);
        } else {
            await interaction.reply({
                content: `伺服器名稱 : ${guildProfile.guildName}\n伺服器 ID : ${guildProfile.guildId}`,
            });
            console.log(guildProfile);
        }
    },
};
