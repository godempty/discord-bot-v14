const{
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roletaker')
    .setDescription('take somebody\'s specific role')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option => 
        option.setName('user')
        .setDescription('the member who won\'t have the role anymore ')
        .setRequired(true))
    .addRoleOption(option => 
        option.setName('role')
        .setDescription('the role the member won\'t no longer have')
        .setRequired(true)),


    /**
     * 
     * @param {CommandInteraction} interaction
     * 
     */
    
    execute(interaction, client){
        const role = interaction.options.getRole('role');
        const user = interaction.options.getMember('user')
        user.roles.remove(role)
        if(!user.roles.cache.some(r => r.name === role.name)){
            interaction.reply({
                content:`${user}沒有${role}身分組`,
                ephemeral:true
            })
        }
        else{
            interaction.reply({
                content: `成功刪除${user}的${role}身分組`,
                ephemeral: true
            })
        }
    }

}