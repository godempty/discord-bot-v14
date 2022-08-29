const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    InteractionCollector,
    MessageComponentInteraction,
    ButtonInteraction,
} = require("discord.js");

const User = require("../../Schemas/user");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("來場完全隨機公平的剪刀石頭布")
        .addUserOption(option => 
            option.setName('player1')
            .setDescription('如果你想要對戰的話，請選擇一號玩家是誰')
            .setRequired(false))
        .addUserOption(option =>
            option.setName('player2')
            .setDescription('如果你想要對戰的話，請選擇二號玩家是誰')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Speak),

    /**
     *
     * @param {CommandInteraction} interaction
     * 
     */

    async execute(interaction, client) {
        const player = interaction.user;
        const paperbtn = new ButtonBuilder()
            .setCustomId("paperbtn")
            .setLabel("布")
            .setEmoji("1005157184616796190")
            .setStyle(ButtonStyle.Primary);

        const scissorbtn = new ButtonBuilder()
            .setCustomId("scissorbtn")
            .setLabel("剪刀")
            .setEmoji("1005157167248191559")
            .setStyle(ButtonStyle.Primary);

        const stonebtn = new ButtonBuilder()
            .setCustomId("stonebtn")
            .setLabel("石頭")
            .setEmoji("1005157196511858752")
            .setStyle(ButtonStyle.Primary)

        const row = new ActionRowBuilder().addComponents(
            scissorbtn,
            stonebtn,
            paperbtn
        );
        const player1 = interaction.options.getMember('player1').user;
        const player2 = interaction.options.getMember('player2').user;
        console.log(player1);
        console.log(`=============================================================`);
        console.log(player2);
        console.log(`=============================================================`);
        console.log(player);
        if((player1 && player2) && (player1===player || player2 === player)){
            let embed = new EmbedBuilder()
            .setTitle("剪刀石頭布")
            .setDescription(`${player1.username} 開始了與 ${player2.username} 的剪刀石頭布對戰\n請雙方在30秒內選擇要出的拳`)
            .setColor("#11d1ce")
            .setFooter({
                text: `${player.username} | easy rps game`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            interaction.reply({
                embeds: [embed],
                components: [row],
                fetchReply: true,
            })
            let userProfile1 = await User.findOne({
                GuildId: interaction.guild.id,
                UserId: player1.id
            })
            let userProfile2 = await User.findOne({
                GuildId: interaction.guild.id,
                UserId: player2.id,
            })
            if(!userProfile1){
                userProfile1 = await new User({
                    _id: mongoose.Types.ObjectId(),
                    GuildId: interaction.guildId,
                    UserId: player1.id,
                    userName: player1.username,
                    lastupdate: Date.now(),
                    jointime: Date.now(),
                    money: 0,
                    bank: 0,
                });
                await userProfile1.save().catch(console.error);
            }
            if(!userProfile2){
                userProfile2 = await new User({
                    _id: mongoose.Types.ObjectId(),
                    GuildId: interaction.guildId,
                    UserId: player2.id,
                    userName: player2.username,
                    lastupdate: Date.now(),
                    jointime: Date.now(),
                    money: 0,
                    bank: 0,
                });
                await userProfile2.save().catch(console.error);
            }
            const filter = i => (i.customId === 'stonebtn' || i.customId === 'paperbtn' || i.customId === 'scissorbtn');
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
            var click = 0
            var ID;
            function setid(a){
                ID = a;
            }
            interaction.fetchReply().then(msg=>
                setid(msg.id)
            );
            collector.on('collect', async i => {
                if(i.message.id != ID){
                    return;
                }
                if(click === 1){
                    return;
                }
                click = 1; 
                if(i.user.id === player1.id){
                    const p1 = i.customId;
                } 
                else if(i.user.id === player2.id){
                    const p2 = i.customId;
                }
                else{
                    interaction.editReply({
                        content:`${i.username}你並沒有參加這場遊戲`,
                    })
                    return;
                }
                if(p1 && p2){
                    var go = true;
                }
                const embed2 = new EmbedBuilder()
                .setTitle('遊戲結果')
                .setColor("#11d1ce")
                .setFooter({
                    text: `${player.username} | easy rps game`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                
                if(p1 === 'stonebtn' && go){
                    if(p2 === 'stonbtn'){
                        embed2.setDescription(`${player1.username} 與 ${player2.userName} 平手\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '石頭',inline: true },
                            {name: `${player2.username} 出了`, value: '石頭',inline: true },
                        );
                    }
                    else if(p2 === 'scissorbtn'){
                        userProfile1.money = userProfile1.money+5;
                        userProfile2.money = userProfile2.money-5;
                        await userProfile1.save().catch(console.error);
                        await userProfile2.save().catch(console.error);
                        embed2.setDescription(`${player1.username} 贏了並獲得 ${player2.username} 的5元\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '石頭',inline: true },
                            {name: `${player2.username} 出了`, value: '剪刀',inline: true },
                        );
                    }
                    else if(p2 === 'paperbtn'){
                        userProfile1.money = userProfile1.money-5;
                        userProfile2.money += 5;
                        await userProfile1.save().catch(console.error);
                        await userProfile2.save().catch(console.error);
                        embed2.setDescription(`${player1.username} 贏了並給予 ${player2.username} 5元\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '石頭',inline: true },
                            {name: `${player2.username} 出了`, value: '布',inline: true },
                        );
                    }
                }
                if(p1 === 'scissorbtn' && go){
                    if(p2 === 'scissorbtn'){
                        embed2.setDescription(`${player1.username} 與 ${player2.userName} 平手\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '剪刀',inline: true },
                            {name: `${player2.username} 出了`, value: '剪刀',inline: true },
                        );
                    }
                    else if(p2 === 'paperbtn'){
                        userProfile1.money = userProfile1.money+5;
                        userProfile2.money = userProfile2.money-5;
                        await userProfile1.save().catch(console.error);
                        await userProfile2.save().catch(console.error);
                        embed2.setDescription(`${player1.username} 贏了並獲得 ${player2.username} 的5元\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '剪刀',inline: true },
                            {name: `${player2.username} 出了`, value: '布',inline: true },
                        );
                    }
                    else if(p2 === 'stonbtn'){
                        userProfile1.money = userProfile1.money-5;
                        userProfile2.money += 5;
                        await userProfile1.save().catch(console.error);
                        await userProfile2.save().catch(console.error);
                        embed2.setDescription(`${player1.username} 輸了並給予 ${player2.username} 5元\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '剪刀',inline: true },
                            {name: `${player2.username} 出了`, value: '石頭',inline: true },
                        );
                    }
                }
                if(p1 === 'paperbtn' && go){
                    if(p2 === 'paperbtn'){
                        embed2.setDescription(`${player1.username} 與 ${player2.userName} 平手\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '布',inline: true },
                            {name: `${player2.username} 出了`, value: '布',inline: true },
                        );
                    }
                    else if(p2 === 'stonebtn'){
                        userProfile1.money = userProfile1.money+5;
                        userProfile2.money = userProfile2.money-5;
                        await userProfile1.save().catch(console.error);
                        await userProfile2.save().catch(console.error);
                        embed2.setDescription(`${player1.username} 贏了並獲得 ${player2.username} 的5元\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '布',inline: true },
                            {name: `${player2.username} 出了`, value: '石頭',inline: true },
                        );
                    }
                    else if(p2 === 'scissorbtn'){
                        userProfile1.money = userProfile1.money-5;
                        userProfile2.money += 5;
                        await userProfile1.save().catch(console.error);
                        await userProfile2.save().catch(console.error);
                        embed2.setDescription(`${player1.username} 輸了並給予 ${player2.username} 5元\n ${player1.username}的現金餘額是 ${userProfile1.money} 元\n ${player2.username}的現金餘額是 ${userProfile2.money} 元`);
                        embed2.addFields(
                            {name: `${player1.username} 出了`, value: '布',inline: true },
                            {name: `${player2.username} 出了`, value: '剪刀',inline: true },
                        );
                    }
                }
                
                interaction.editReply({
                    embeds: [embed2],
                    components: []
                })

            });
            collector.on('end', async i => {
                if(click === 0){
                    const embed2 = new EmbedBuilder()
                        .setTitle('遊戲結果')
                        .setColor("#11d1ce")
                        .setFooter({
                            text: `${player.user.username} | easy rps game`,
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                        .setDescription(`此次遊戲無效\n ${player1.username} 和 ${player2.username} \n沒有在30秒內按下任何按鈕`)
                    interaction.editReply({
                        embeds:[embed2],
                        components: [],
                    })
                }
                else{
                    return;
                }
            })
        }
        else if(!player2 && ((player1 != player)&&player1)){
            interaction.reply({
                content: `請不要為別人擅自開啟單人遊戲`,
                ephemeral: true
            })
        }
        else if((!player2 && (player1 === player)) || (!player1&&!player2)){    
            let embed = new EmbedBuilder()
                .setTitle("剪刀石頭布")
                .setDescription(`${player.username} 開始了剪刀石頭布\n請在30秒內選擇要出的拳`)
                .setColor("#11d1ce")
                .setFooter({
                    text: `${player.username} | easy rps game`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
            
            interaction.reply({
                embeds: [embed],
                components: [row],
                fetchReply: true,
            });
            let userProfile = await User.findOne({
                GuildId: interaction.guild.id,
                UserId: interaction.user.id,
            });
            if(!userProfile){
                userProfile = await new User({
                    _id: mongoose.Types.ObjectId(),
                    GuildId: interaction.guildId,
                    UserId: player.id,
                    userName: player.username,
                    lastupdate: Date.now(),
                    jointime: Date.now(),
                    money: 0,
                    bank: 0,
                });
                await userProfile2.save().catch(console.error);
            }
            const filter = i => (i.customId === 'stonebtn' || i.customId === 'paperbtn' || i.customId === 'scissorbtn')&& i.user.id === interaction.user.id ;

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
            var click = 0
            var ID;
            function setid(a){
                ID = a;
            }
            interaction.fetchReply().then(msg=>
                setid(msg.id)
            );
            collector.on('collect', async i => {
                if(i.message.id != ID){
                    return;
                }
                if(click === 1){
                    return;
                }
                click = 1; 
                const embed2 = new EmbedBuilder()
                .setTitle('遊戲結果')
                .setColor("#11d1ce")
                .setFooter({
                    text: `${player.username} | easy rps game`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                
                var pc = Math.floor(Math.random()*3);
                function delay(n){
                    return new Promise(function(resolve){
                        setTimeout(resolve,n*1000);
                    });
                }
                function randInt(n){
                    return Math.floor(Math.random()*n);
                }
                const waitembed = new EmbedBuilder()
                .setTitle('電腦正在決定出什麼拳')
                .setColor("#11d1ce")
                .setFooter({
                    text: `${player.username} | easy rps game`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
                for(var x = 0 ; x < 10 ; x++){
                    pc = randInt(3)
                    waitembed.setDescription((10-x).toString());
                    if(pc===0){
                        waitembed.setImage('https://cdn.discordapp.com/attachments/1012396621587300384/1012396725316616242/scissors.png')
                    }
                    else if(pc===1){
                        waitembed.setImage('https://cdn.discordapp.com/attachments/1012396621587300384/1012396742345502750/rock.png')
                    }
                    else if(pc===2){
                        waitembed.setImage('https://cdn.discordapp.com/attachments/1012396621587300384/1012396743394078730/paper.png')
                    }
                    interaction.editReply({
                        embeds:[waitembed],
                        components:[],
                    })
                    await delay(0.6)
                }
                if(i.customId === 'stonebtn'){
                    if(pc === 1){
                        embed2.setDescription(`${player.username} 與電腦平手\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '石頭',inline: true },
                            {name: '電腦出了', value: '石頭',inline: true },
                        );
                    }
                    else if(pc === 0){
                        userProfile.money = userProfile.money+5;
                        await userProfile.save().catch(console.error);
                        embed2.setDescription(`${player.username} 贏了並獲得5元\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '石頭',inline: true },
                            {name: '電腦出了', value: '剪刀',inline: true },
                        );
                    }
                    else if(pc === 2){
                        userProfile.money = userProfile.money-5;
                        await userProfile.save().catch(console.error);
                        embed2.setDescription(`${player.username} 贏了並失去5元\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '石頭',inline: true },
                            {name: '電腦出了', value: '布',inline: true },
                        );
                    }
                }
                else if(i.customId === 'paperbtn'){
                    if(pc === 2){
                        embed2.setDescription(`${player.username} 與電腦平手\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '布',inline: true },
                            {name: '電腦出了', value: '布',inline: true },
                        );
                    }
                    else if(pc === 1){
                        userProfile.money = userProfile.money+5;
                        await userProfile.save().catch(console.error);
                        embed2.setDescription(`${player.username} 贏了並獲得5元\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '布',inline: true },
                            {name: '電腦出了', value: '石頭',inline: true },
                        );
                    }
                    else if(pc === 0){
                        userProfile.money = userProfile.money-5;
                        await userProfile.save().catch(console.error);
                        embed2.setDescription(`${player.username} 贏了並失去5元\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '布',inline: true },
                            {name: '電腦出了', value: '剪刀',inline: true },
                        );
                    }
                }
                else{
                    if(pc === 0){
                        embed2.setDescription(`${player.username} 與電腦平手\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '剪刀',inline: true },
                            {name: '電腦出了', value: '剪刀',inline: true },
                        );
                    }
                    else if(pc === 2){
                        userProfile.money = userProfile.money+5;
                        await userProfile.save().catch(console.error);
                        embed2.setDescription(`${player.username} 贏了並獲得5元\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '剪刀',inline: true },
                            {name: '電腦出了', value: '布',inline: true },
                        );
                    }
                    else if(pc === 1){
                        userProfile.money = userProfile.money-5;
                        await userProfile.save().catch(console.error);
                        embed2.setDescription(`${player.username} 贏了並失去5元\n你的現金餘額是 ${userProfile.money} 元`);
                        embed2.addFields(
                            {name: `${player.username} 出了`, value: '剪刀',inline: true },
                            {name: '電腦出了', value: '石頭',inline: true },
                        );
                    }
                }
                
                interaction.editReply({
                    embeds: [embed2],
                    components: []
                })

            });
            collector.on('end', async i => {
                if(click === 0){
                    const embed2 = new EmbedBuilder()
                        .setTitle('遊戲結果')
                        .setColor("#11d1ce")
                        .setFooter({
                            text: `${player.username} | easy rps game`,
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                        .setDescription(`此次遊戲無效\n ${player.username} 沒有在30秒內按下任何按鈕`)
                    interaction.editReply({
                        embeds:[embed2],
                        components: [],
                    })
                }
                else{
                    return;
                }
            })
        }
        else{
            interaction.reply({
                content: `請不要擅自為其他人開啟對戰`,
                ephemeral: true,
            })
        }

    },
};
