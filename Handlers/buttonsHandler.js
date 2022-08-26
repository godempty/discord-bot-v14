function loadButtons(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Buttons", "Status");
    const Folders = fs.readdirSync(`./Buttons`);
    for (const folder of Folders) {
        const files = fs
            .readdirSync(`./Buttons/${folder}`)
            .filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const button = require(`../Buttons/${folder}/${file}`);
            client.buttons.set(button.data.name, button);
            table.addRow(file, "🟢");
        }
    }
    return console.log(`${table.toString()}`);
}

module.exports = { loadButtons };
