import { Interaction, SlashCommandBuilder } from "discord.js";

const cooldown = 5;

const data = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");

const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  await interaction.reply("Croa !");
};

export const PingCommand = {
  data,
  cooldown,
  execute
};
