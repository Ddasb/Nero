import { Client, EmbedBuilder } from "discord.js";
import { Channels } from "../models/Channels.model";

export const WouafTask = async (client: Client<true>) => {
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
      .setTitle("Le Roi Wouaf apparaît !")
      .setDescription(
        "Pensez à préparer de la nourriture auprès de charmy pour gagnez des golds supplémentaires !"
      )
      .setTimestamp();

    cacheChannel.send({ embeds: [embed] });
  }
};
