import { Interaction, SlashCommandBuilder } from "discord.js";
import { Channels } from "../../models/Channels.model";

const cooldown = 5;

const data = new SlashCommandBuilder()
  .setName("channel")
  .setDescription("Setups channel for alerts!")
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("Channel type to configure")
      .setRequired(true)
      .addChoices({ name: "Alerts", value: "alerts" }, { name: "News", value: "news" })
  );

const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const option = interaction.options.getString("type");

  if (!option) {
    await interaction.reply({
      content: "Wrong type. Please, select a correct type.",
      ephemeral: true
    });
    return;
  }

  await interaction.deferReply({ ephemeral: true });

  const channel = await Channels.findOne({ where: { guild: interaction.guildId } });

  if (!channel) {
    await Channels.create({ guild: interaction.guildId, [option]: interaction.channelId });
  } else {
    await channel.update({ [option]: interaction.channelId });
  }

  await interaction.editReply({ content: "This channel is now used for alerts." });
};

export const AlertsCommand = {
  data,
  cooldown,
  execute
};
