const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: {
        name: "scissorbtn",
    },
    async execute(interaction, client, user) {
        // var use = interaction.user.id;
        // if(use != user){
        //     interaction.reply({
        //         content: "You are not the one who use the command, if you want to play. use /rps",
        //         ephemeral: true,
        //     });
        //     console.log(user)
        //     console.log(use)
        //     console.log('--------')
        //     return;
        // }
        var icon = interaction.member.displayAvatarURL();
        var pc = Math.floor(Math.random()*3);
        var embed = new EmbedBuilder()
        .setTitle('遊戲結果')
        .setFooter({
            text:'easy rps game',
            iconURL: icon,
        })
        .setColor("#11d1ce");
        if(pc === 0){
            embed.setDescription('平手');
            embed.addFields(
                {name: '你出了', value: '剪刀',inline: true },
                {name: '電腦出了', value: '剪刀',inline: true },
            );
        }
        else if(pc === 2){
            embed.setDescription('你贏了');
            embed.addFields(
                {name: '你出了', value: '剪刀',inline: true },
                {name: '電腦出了', value: '布',inline: true },
            );
        }
        else if(pc === 1){
            embed.setDescription('你輸了ㄏㄏ');
            embed.addFields(
                {name: '你出了', value: '剪刀',inline: true },
                {name: '電腦出了', value: '石頭',inline: true },
            );
        }
        interaction.reply({
            embeds : [embed],
        })
    },
};
