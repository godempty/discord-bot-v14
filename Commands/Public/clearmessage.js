const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clearmessage")
        .setDescription("刪除輸入數字行的訊息(兩周內)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option =>
            option.setName('lines')
                .setDescription('刪除幾行')
                .setRequired(true))
        .addUserOption(option=>
            option.setName('target')
                .setDescription('設定只刪除誰的訊息(選填)')
                .setRequired(false)),

    /**
     *
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const lines = interaction.options.getInteger('lines');
        const target = interaction.options.getUser('target');
        let msg = await interaction.channel.messages.fetch();

        const embed = new EmbedBuilder()
        .setTitle('Clear')
        .setColor('#bf8534')
        .setFooter({
            text: interaction.user.tag+` | clear指令`,
            iconURL: interaction.user.displayAvatarURL(),
        });
        
        const filtered = [];
        if(target){
            let i = 0 ;
            msg.filter((m)=>{
                if(m.author.id === target.id && lines > i){
                    filtered.push(m);
                    i++;
                }
            })
            await interaction.channel.bulkDelete(filtered, true).then(m=>{
                embed.setDescription(`已刪除從${target}發送的${m.size}個訊息`)
            })
        }
        else
            await interaction.channel.bulkDelete(lines, true).then(m=>{
                embed.setDescription(`已刪除${m.size}個訊息`)
            })

        interaction.reply({
            embeds:[embed]
        });
    },
};
