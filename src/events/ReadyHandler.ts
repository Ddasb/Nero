import { Client } from "discord.js";
import { Database } from "../Database";
import { Channels } from "../models/Channels.model";
import { RegisterTasks } from "../registers/RegisterTask";

export const ReadyHandler = (client: Client<true>) => {
  Database.addModels([Channels]);
  console.log(`Models added !`);

  Database.sync();
  console.log(`Database syncing !`);

  console.log(`Ready! Logged in as ${client.user.tag}`);

  RegisterTasks(client);
  console.log(`Tasks registered`);
};
