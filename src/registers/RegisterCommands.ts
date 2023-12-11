import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { IClient } from "../@types/IClient";
import { ICommand } from "../@types/ICommand";
import { AlertCommand } from "../commands/utility/Alert";
import { ChannelsCommande } from "../commands/utility/Channels";
import { RegisterRest } from "./RegisterRest";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const setCommande = (client: IClient, command: ICommand) => {
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
};

export const RegisterCommands = async (client: IClient) => {
  try {
    setCommande(client, ChannelsCommande);
    setCommande(client, AlertCommand);

    await RegisterRest(commands);
  } catch (error) {
    console.error(error);
  }
};
