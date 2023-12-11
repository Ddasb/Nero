import { Client } from "discord.js";

export const ReadyHandler = (client: Client<true>) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
};
