const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trash")
        .setDescription("抽選倒垃圾的人")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {CommandInteraction} interaction
     */

    execute(interaction) {
        function pick(allMembers) {
            return allMembers.random();
        }

        interaction.guild.members.fetch().then((allMembers) => {
            var bot = true;
            var member;

            while (bot) {
                member = pick(allMembers);
                if (member.user.bot === false) bot = false;
            }
            const icon = member.user.displayAvatarURL();
            const embed = new EmbedBuilder()
                .setDescription(`${member.toString()} 你要倒垃圾摟!`)
                .setTitle("本日垃圾人")
                .setFooter({
                    text: member.user.tag + " | 抽選系統",
                    iconURL: icon,
                })
                .setColor("#B2D0EC");
            interaction.reply({ embeds: [embed] });
        });
    },
};
