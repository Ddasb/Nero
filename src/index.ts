import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { ISlashCommand } from "./types/ISlashCommand";
const { Guilds } = GatewayIntentBits;

// Initialisation du client
const client = new Client({ intents: [Guilds] });

client.slashCommands = new Collection<string, ISlashCommand>();
const commands = [];

// Gestion des commandes
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.slashCommands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.slashCommands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true
      });
    }
  }
});

// Enregistrement des commandes
const rest = new REST().setToken(process.env.TOKEN);
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands
    });

    console.log(`Successfully reloaded ${(data as unknown[]).length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

// Connexion du client
client.login(process.env.TOKEN);
