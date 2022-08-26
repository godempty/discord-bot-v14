function loadEvents(client) {
    const { connection } = require("mongoose");
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Events", "Status");

    const folders = fs.readdirSync("./Events");
    for (const folder of folders) {
        const files = fs
            .readdirSync(`./Events/${folder}`)
            .filter((file) => file.endsWith(".js"));

        switch (folder) {
            case "Mongo": {
                for (const file of files) {
                    const event = require(`../Events/${folder}/${file}`);
                    if (event.once)
                        connection.once(event.name, (...args) =>
                            event.execute(...args, client)
                        );
                    else
                        connection.on(event.name, (...args) =>
                            event.execute(...args, client)
                        );
                }
                break;
            }
            default: {
                for (const file of files) {
                    const event = require(`../Events/${folder}/${file}`);

                    if (event.rest) {
                        if (event.once)
                            client.rest.once(event.name, (...args) =>
                                event.execute(...args, client)
                            );
                        else
                            client.rest.on(event.name, (...args) =>
                                event.execute(...args, client)
                            );
                    } else {
                        if (event.once)
                            client.once(event.name, (...args) =>
                                event.execute(...args, client)
                            );
                        else
                            client.on(event.name, (...args) =>
                                event.execute(...args, client)
                            );
                    }
                    table.addRow(file, "🟢");
                }
            }
        }
    }
    return console.log(`${table.toString()}`);
}

module.exports = { loadEvents };
