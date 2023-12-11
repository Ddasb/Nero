import { EmbedBuilder, Interaction, SlashCommandBuilder } from "discord.js";
import { Channels } from "../../models/Channels.model";

const cooldown = 30;

const data = new SlashCommandBuilder()
  .setName("alert")
  .setDescription("Post an alert !")
  .addStringOption((option) =>
    option.setName("title").setDescription("Title of your alert").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("description").setDescription("Description of your alert").setRequired(true)
  )
  .addStringOption((option) => option.setName("image").setDescription("Url of your thumbnail"));

const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const title = interaction.options.getString("title");
  const description = interaction.options.getString("description");
  const image = interaction.options.getString("image");

  if (!title || !description || !interaction.guildId) {
    await interaction.reply({ content: "Missing informations.", ephemeral: true });
    return;
  }

  const channel = await Channels.findOne({ where: { guild: interaction.guildId } });

  if (!channel?.alerts) {
    await interaction.reply({ content: "No channel configured.", ephemeral: true });
    return;
  }

  const alertsChannel = interaction.client.channels.cache.get(channel.alerts);

  if (!alertsChannel || !alertsChannel.isTextBased()) {
    await interaction.reply({ content: "No channel configured.", ephemeral: true });
    return;
  }

  const embedAlert = new EmbedBuilder()
    .setColor("White")
    .setTitle(title)
    .setDescription(description)
    .setImage(image)
    .setURL(process.env.INVITATION_URL)
    .setTimestamp();

  alertsChannel.send({ embeds: [embedAlert] });
};

export const AlertCommand = {
  data,
  cooldown,
  execute
};
