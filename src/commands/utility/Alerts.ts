import { Interaction, SlashCommandBuilder } from "discord.js";
import { Channels } from "../../models/Channels.model";

const cooldown = 5;

const data = new SlashCommandBuilder()
  .setName("alerts")
  .setDescription("Setups channel for alerts!");

const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  await interaction.deferReply();

  const channel = await Channels.findOne({ where: { guild: interaction.guildId } });

  if (!channel) {
    await Channels.create({ guild: interaction.guildId, alert: interaction.channelId });
  } else {
    await Channels.create({ ...channel.toJSON(), alert: interaction.channelId });
  }

  await interaction.reply({ content: "This channel is now used for alerts.", ephemeral: true });
};

export const AlertsCommand = {
  data,
  cooldown,
  execute
};
