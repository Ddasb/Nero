import { Client, Events } from "discord.js";

const name = Events.ClientReady;

const once = true;

const execute = (client: Client<true>) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
};

module.exports = { name, once, execute };
