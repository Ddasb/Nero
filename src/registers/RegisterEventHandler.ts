import { Client, Events } from "discord.js";
import { InteractionCreateHandler } from "../events/InteractionCreate";
import { ReadyHandler } from "../events/ReadyHandler";

export const RegisterEventHandler = (client: Client) => {
  client.once(Events.ClientReady, ReadyHandler);

  client.on(Events.InteractionCreate, InteractionCreateHandler);
};
