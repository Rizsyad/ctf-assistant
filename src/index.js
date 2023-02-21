// require("./webserver");
require("dotenv").config();
const { TOKEN } = process.env;

const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { loadEvents } = require("./Handlers/eventHandler");

const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions } =
  GatewayIntentBits;

const { User, Message, GuildMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions],
  partials: [User, Message, GuildMember],
});

client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

loadEvents(client);
client.login(TOKEN);
