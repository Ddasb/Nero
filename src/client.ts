import { Client, Collection, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { RegisterCommands } from "./registers/RegisterCommands";
import { RegisterEventHandler } from "./registers/RegisterEventHandler";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.cooldowns = new Collection();

const initClient = async () => {
  await RegisterCommands(client);

  RegisterEventHandler(client);

  await client.login(process.env.TOKEN);
};

initClient();
