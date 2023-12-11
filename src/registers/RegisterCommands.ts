import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { IClient } from "../@types/IClient";
import { ICommand } from "../@types/ICommand";
import { ChannelsCommande } from "../commands/utility/Channels";
import { RegisterRest } from "./RegisterRest";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

export const SetCommande = (client: IClient, command: ICommand) => {
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
};

export const RegisterCommands = (client: IClient) => {
  try {
    SetCommande(client, ChannelsCommande);

    RegisterRest(commands);
  } catch (error) {
    console.error(error);
  }
};
