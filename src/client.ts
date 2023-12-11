import { Client, Collection, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { RegisterCommands } from "./registers/RegisterCommands";
import { RegisterEventHandler } from "./registers/RegisterEventHandler";

dotenv.config();

export const database = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite"
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.cooldowns = new Collection();

RegisterCommands(client);
RegisterEventHandler(client);

client.login(process.env.TOKEN);
