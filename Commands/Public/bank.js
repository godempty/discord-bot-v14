const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
    EmbedBuilder,
} = require("discord.js");

const User = require('../../Schemas/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bank')
        .setDescription('對你的存款做操作')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => 
            option.setName('operation')
            .setDescription('存款/提款')
            .setRequired(true)
            .addChoices(
                {name: 'deposit', value: 'save'},
                {name: 'withdraw', value: 'take'}
            ))
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('金額')
            .setRequired(true))
        ,
        

    /**
     *
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const operate = interaction.options.getString('operation');
        const amount = interaction.options.getInteger('amount');
        let userProfile = await User.findOne({
            UserId: interaction.member.id,
            GuildId: interaction.guild.id
        })
        var real = 0;
        switch(operate){
            case 'save':  {
                if(userProfile.money >= amount){
                    userProfile.money = userProfile.money - amount;
                    userProfile.bank = userProfile.bank + amount;
                    real = amount;
                }
                else{
                    var all = userProfile.money;
                    userProfile.money = 0;
                    userProfile.bank = userProfile.bank+all
                    real = all;
                }
                await userProfile.save().catch(console.error);
                break;
            }
            case 'take': {
                if(userProfile.bank >= amount){
                    userProfile.bank = userProfile.bank - amount;
                    userProfile.money = userProfile.money + amount;
                    real = amount;
                }
                else{
                    var all = userProfile.bank;
                    userProfile.bank = 0;
                    userProfile.money = userProfile.money+all
                    real = all;
                }
                await userProfile.save().catch(console.error);
                break;
            }
            
        }
        const embed = new EmbedBuilder()
            .setFields({name: `使用者名稱`, value: `${userProfile.userName}`},{name: `💰擁有現金`, value: `${userProfile.money}`},{name: `🏦擁有存款`, value: `${userProfile.bank}`})
            .setColor('#fcba03')
            .setFooter({text: `${interaction.user.tag} | 🏧銀行`, iconURL: interaction.user.displayAvatarURL()})
        
        if(operate === 'save'){
            interaction.reply({
                content: `${userProfile.userName}成功存入 ${real} 元`,
                embeds: [embed],
            })
        }
        else if( operate === 'take'){
            interaction.reply({
                content: `${userProfile.userName}成功取出 ${real} 元`,
                embeds: [embed],
            })
        }
    },
};
