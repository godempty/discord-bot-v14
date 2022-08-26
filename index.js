const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const { loadButtons } = require("./Handlers/buttonsHandler");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.buttons = new Collection();
client.commands = new Collection();

client
    .login(client.config.token) 
    .then(() => {
        loadEvents(client);
        console.log("Events loaded");
        loadCommands(client);
        console.log("Commands loaded");
        loadButtons(client);
        console.log("Buttons loaded");
    })
    .catch((err) => console.log(err));
