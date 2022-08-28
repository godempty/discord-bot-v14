const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../Schemas/guild");

module.exports = {
    name: "guildCreate",
    once: true,
    async execute(guild, client) {
        
        let guildProfile = await new Guild({
            _id: mongoose.Types.ObjectId(),
            guildId: guild.id,
            guildName: guild.name,
            guildIcon: guild.iconURL() ? guild.iconURL() : "無",
        });
        await guildProfile.save().catch(console.error);
        const embed = new EmbedBuilder()
        .setColor('#ed0028')
        .setAuthor({name: guild.name, iconURL: guild.iconURL()})
        .setDescription(`
        ${client.user.username}成功加入**${guild.name}** !\n
        `)
        .setFooter({text: `${client.user.username} | 我來了`, iconURL: `https://cdn.discordapp.com/attachments/1012396621587300384/1012396683545546903/unknown.png`})
        await guild.systemChannel.send({
            embeds:[embed],
        })
        console.log(guildProfile);
    },
};
