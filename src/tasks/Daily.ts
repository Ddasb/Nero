import { Client, EmbedBuilder } from "discord.js";
import { Channels } from "../models/Channels.model";

export const DailyTask = async (client: Client<true>) => {
  const guilds = client.guilds.cache;

  for (const [id] of guilds) {
    const channel = await Channels.findOne({ where: { guild: id } });

    if (!channel || !channel.alerts) continue;

    const cacheGuild = client.guilds.cache.get(id);

    if (!cacheGuild) continue;

    const cacheChannel = cacheGuild.channels.cache.get(channel.alerts);

    if (!cacheChannel || !cacheChannel.isTextBased()) continue;

    const embed = new EmbedBuilder()
      .setColor("White")
      .setTitle("N'oubliez pas vos daily !")
      .setDescription(
        "Pensez à envoyer vos cadeaux a vos amis, vos défis limités et à faire vos combats de donjon pour utilisez vos tickets d'équipements."
      )
      .setTimestamp();

    cacheChannel.send({ embeds: [embed] });
  }
};
