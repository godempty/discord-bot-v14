const{
    SlashCommandBuilder,
    PermissionFlagsBits,
    CommandInteraction,
} = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName('rolegiver')
    .setDescription('make somebody have specific role')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option => 
        option.setName('user')
        .setDescription('the member will have the role you choose')
        .setRequired(true))
    .addRoleOption(option => 
        option.setName('role')
        .setDescription('the role the member will have')
        .setRequired(true)),


    /**
     * 
     * @param {CommandInteraction} interaction
     * 
     */
    
    execute(interaction, client){
        const role = interaction.options.getRole('role');
        const user = interaction.options.getMember('user')
        
        if(user.roles.cache.some(r => r.name === role.name)){
            interaction.reply({
                content:`${user}已經擁有${role}身分組`,
                ephemeral: true,
            })
        }
        else{
            user.roles.add(role)
            interaction.reply({
                content: `成功給予${user}${role}身分組`,
                ephemeral: true,
            })
        }
    }

}