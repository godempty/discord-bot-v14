const { CommandInteraction, ButtonInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",

    /**
     *
     * @param {CommandInteraction} interaction
     */

    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                interaction.reply({
                    content: "此指令已經過期了，就像你的人生一樣",
                    ephemeral: true,
                });
            }
            try {
                command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                interaction.reply({
                    content: `此指令執行出錯，請回報開發端`,
                    ephemeral: true,
                });
            }
        } 
        // else if (interaction.isButton()) {
        //     const Button = client.buttons.get(interaction.customId);
        //     if (!Button) {
        //         return new Error("此按鈕沒有設定指令");
        //     }
        //     try {
        //         Button.execute(interaction, client);
        //     } catch (error) {
        //         console.error(error);
        //         interaction.reply({
        //             content: `此按鈕執行出錯，請回報開發端`,
        //             ephemeral: true,
        //         });
        //     }
        // }
    },
};
