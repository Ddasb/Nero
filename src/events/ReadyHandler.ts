import { Client } from "discord.js";
import { Channels } from "../models/Channels.model";

export const ReadyHandler = (client: Client<true>) => {
  Channels.sync();

  console.log(`Ready! Logged in as ${client.user.tag}`);
};
