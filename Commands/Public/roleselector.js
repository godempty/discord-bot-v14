const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("roleselector")
        .setDescription("建立一個下拉式選單以選取身分組")
        .addRoleOption(option => 
            option.setName('role1')
            .setDescription('第1個身分組')
            .setRequired(true))
        .addRoleOption(option => 
            option.setName('role2')
            .setDescription('第2個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role3')
            .setDescription('第3個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role4')
            .setDescription('第4個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role5')
            .setDescription('第5個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role6')
            .setDescription('第6個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role7')
            .setDescription('第7個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role8')
            .setDescription('第8個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role9')
            .setDescription('第9個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role10')
            .setDescription('第10個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role11')
            .setDescription('第11個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role12')
            .setDescription('第12個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role13')
            .setDescription('第13個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role14')
            .setDescription('第14個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role15')
            .setDescription('第15個身分組')
            .setRequired(false))
        .addRoleOption(option => 
            option.setName('role16')
            .setDescription('第16個身分組')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     *
     * @param {CommandInteraction} interaction
     * 
     */

    async execute(interaction, client) {
        const {options} = interaction
        const role1 = options.getRole('role1');
        const role2 = options.getRole('role2');
        const role3 = options.getRole('role3');
        const role4 = options.getRole('role4');
        const role5 = options.getRole('role5');
        const role6 = options.getRole('role6');
        const role7 = options.getRole('role7');
        const role8 = options.getRole('role8');
        const role9 = options.getRole('role9');
        const role10 = options.getRole('role10');
        const role11 = options.getRole('role11');
        const role12 = options.getRole('role12');
        const role13 = options.getRole('role13');
        const role14 = options.getRole('role14');
        const role15 = options.getRole('role15');
        const role16 = options.getRole('role16');
        var cnt = 1;
        const rolesincluded = [role1.id]
        const SelectMenu = new SelectMenuBuilder()
            .setCustomId('Selectmenu')
            .setPlaceholder('尚未選取')
            .addOptions(
                {
                    label: 'remove',
                    description: '移除你所擁有的選單內有的身分組(如果你選錯身分組時使用)',
                    value: 'remove',
                },
                {
                    label: role1.name,
                    description: `領取${role1.name}身分組`,
                    value: role1.id,
                },
            )
        if(role2){
            SelectMenu.addOptions({
                label: role2.name,
                description: `領取${role2.name}身分組`,
                value: role2.id
            })
            cnt++;
            rolesincluded.push(role2.id);
        }
        if(role3){
            SelectMenu.addOptions({
                label: role3.name,
                description: `領取${role3.name}身分組`,
                value: role3.id
            })
            cnt++;
            rolesincluded.push(role3.id);
        }
        if(role4){
            SelectMenu.addOptions({
                label: role4.name,
                description: `領取${role4.name}身分組`,
                value: role4.id
            })
            cnt++;
            rolesincluded.push(role4.id);
        }
        if(role5){
            SelectMenu.addOptions({
                label: role5.name,
                description: `領取${role5.name}身分組`,
                value: role5.id
            })
            cnt++;
            rolesincluded.push(role5.id);
        }
        if(role6){
            SelectMenu.addOptions({
                label: role6.name,
                description: `領取${role6.name}身分組`,
                value: role6.id
            })
            cnt++;
            rolesincluded.push(role6.id);
        }
        if(role7){
            SelectMenu.addOptions({
                label: role7.name,
                description: `領取${role7.name}身分組`,
                value: role7.id
            })
            cnt++;
            rolesincluded.push(role7.id);
        }
        if(role8){
            SelectMenu.addOptions({
                label: role8.name,
                description: `領取${role8.name}身分組`,
                value: role8.id
            })
            cnt++;
            rolesincluded.push(role8.id);
        }
        if(role9){
            SelectMenu.addOptions({
                label: role9.name,
                description: `領取${role9.name}身分組`,
                value: role9.id
            })
            cnt++;
            rolesincluded.push(role9.id);
        }
        if(role10){
            SelectMenu.addOptions({
                label: role10.name,
                description: `領取${role10.name}身分組`,
                value: role10.id
            })
            cnt++;
            rolesincluded.push(role10.id);
        }
        if(role11){
            SelectMenu.addOptions({
                label: role11.name,
                description: `領取${role11.name}身分組`,
                value: role11.id
            })
            cnt++;
            rolesincluded.push(role11.id);
        }
        if(role12){
            SelectMenu.addOptions({
                label: role12.name,
                description: `領取${role12.name}身分組`,
                value: role12.id
            })
            cnt++;
            rolesincluded.push(role12.id);
        }
        if(role13){
            SelectMenu.addOptions({
                label: role13.name,
                description: `領取${role13.name}身分組`,
                value: role13.id
                
            })
            cnt++;
            rolesincluded.push(role13.id);
        }
        if(role14){
            SelectMenu.addOptions({
                label: role14.name,
                description: `領取${role14.name}身分組`,
                value: role14.id
                
            })
            cnt++;
            rolesincluded.push(role14.id);
        }
        if(role15){
            SelectMenu.addOptions({
                label: role15.name,
                description: `領取${role15.name}身分組`,
                value: role15.id
                
            })
            cnt++;
            rolesincluded.push(role15.id);
        }
        if(role16){
            SelectMenu.addOptions({
                label: role16.name,
                description: `領取${role16.name}身分組`,
                value: role16.id
                
            })
            cnt++;
            rolesincluded.push(role16.id);
        }
        SelectMenu.setMaxValues(cnt+1);
        SelectMenu.setMinValues(1);

        var row = new ActionRowBuilder()
        .addComponents(SelectMenu);

        var embed = new EmbedBuilder()
            .setTitle('身分組選擇器')
            .setDescription('請選擇你所要領取的身分組')
            .setColor(0x0099FF);
        
        interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply:true,
        });
        var ID;
        function setid(a){
            ID = a;
        }
        interaction.fetchReply().then(msg=>
            setid(msg.id)
        );
        
        const filter = i => (i.customId === 'Selectmenu' && i.message.id === ID);
        
        const collector = interaction.channel.createMessageComponentCollector({ filter});

        collector.on('collect', async i => {
            let removed = [];
            let added = [];
            let len = i.values.length;
            for(let t = 0 ; t < len ; t++){
                if(i.values[t] === 'remove'){
                    let alen = rolesincluded.length; 
                    for(let tt = 0 ; tt < alen ; tt++){
                        const role = i.guild.roles.cache.get(rolesincluded[tt]);
                        if(role && i.member.roles.cache.get(role.id)){
                            i.member.roles.remove(role);
                            removed.push(role);
                        }
                    }
                }
            }
            for(let t = 0 ; t < len ; t++){
                const role = i.guild.roles.cache.get(i.values[t]);
                if(role){
                    if(!i.member.roles.cache.get(role.id)) added.push(role);
                    const a = removed.findIndex((r) => r === role);
                    if(a != -1){
                        removed.splice(a,1);
                    }
                    i.member.roles.add(role);
                }
            }
            if(removed.length===0) removed = ['無'];
            if(added.length===0) added = ['無'];
            const embed = new EmbedBuilder()
            .setDescription(`**成功新增:**\n${added}\n**成功刪除:**\n${removed}\n`)
            .setFooter({
                iconURL: i.user.displayAvatarURL(),
                text: `${i.user.tag}| role select menu`
            })
            i.reply({
                embeds: [embed],
                ephemeral: true,
            })
        })


    },
};
