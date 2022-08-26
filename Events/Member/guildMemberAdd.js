const { GuildMember, EmbedBuilder, WebhookClient } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../Schemas/user");

module.exports = {
    name: "guildMemberAdd",
    once: true,
    /**
     *
     * @param {GuildMember} member
     */

    async execute(member) {
        const { user, guild } = member;
        member.roles.add('1012386003253723196');
        let userProfile = await new User({
            _id: mongoose.Types.ObjectId(),
            GuildId: guild.id,
            UserId: user.id,
            userName: user.username,
            lastupdate: Date.now(),
            jointime: Date.now(),
            money: 0,
            bank: 0,
        });
        await userProfile.save().catch(console.error);
        const embed = new EmbedBuilder()
        .setColor('#ed0028')
        .setAuthor({name: guild.name, iconURL: guild.iconURL()})
        .setDescription(`
        歡迎${member}加入**${guild.name}** !\n
        `)
        .setFooter({text: `${user.username} | Welcomer`, iconURL: `https://cdn.discordapp.com/attachments/1012396621587300384/1012396683545546903/unknown.png`})
        
        await guild.channels.fetch(`1012393023386173472`).then(channel => channel.send({
            embeds:[embed],
        }))
        console.log(userProfile);
    },
};
