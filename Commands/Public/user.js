const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,

} = require("discord.js");
const mongoose = require("mongoose");

const User = require("../../Schemas/user");
const Guild = require("../../Schemas/guild")

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("傳送位於資料庫的個人資訊")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     *
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        const { user } = interaction;
        let userProfile = await User.findOne({
            GuildId: interaction.guild.id,
            UserId: user.id,
        });
        let guildProfile = await Guild.findOne({
            guildId: interaction.guild.id
        })

        if (!userProfile) {
            userProfile = await new User({
                _id: mongoose.Types.ObjectId(),
                GuildId: interaction.guildId,
                UserId: user.id,
                userName: user.username,
                lastupdate: Date.now(),
                money: 0,
                bank: 0,
            });
            await userProfile.save().catch(console.error);
            
            await interaction.channel.send({
                content: `正在上傳你的資訊至資料庫`,
            });
            const embed = new EmbedBuilder()
            .setFields({name: `使用者名稱`, value: `${userProfile.userName}`},{name: `💰擁有現金`, value: `${userProfile.money}`},{name: `🏦擁有存款`, value: `${userProfile.bank}`},{name: `上次查詢資料時間`, value: `${userProfile.lastupdate}`},{name: `目前所在伺服器`, value: `${guildProfile.guildName}`})
            .setColor('#fcba03')
            .setFooter({text: `${user.tag} | 使用者資料`, iconURL: user.displayAvatarURL()})
            await interaction.reply({
               embeds:[embed],
            });
            // console.log(userProfile);
        } else {
            const embed = new EmbedBuilder()
            .setFields({name: `使用者名稱`, value: `${userProfile.userName}`},{name: `💰擁有現金`, value: `${userProfile.money}`},{name: `🏦擁有存款`, value: `${userProfile.bank}`},{name: `上次查詢資料時間`, value: `${userProfile.lastupdate}`},{name: `目前所在伺服器`, value: `${guildProfile.guildName}`})
            .setColor('#fcba03')
            .setFooter({text: `${user.tag} | 使用者資料`, iconURL: user.displayAvatarURL()})
            await interaction.reply({
                embeds:[embed],
            }); 
            userProfile.lastupdate = Date.now();
            userProfile.save().catch(console.error);
            // console.log(userProfile);
        }
    },
};
