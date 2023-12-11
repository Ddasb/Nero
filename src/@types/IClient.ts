import { Client, Collection } from "discord.js";
import { ICommand } from "./ICommand";

export interface IClient extends Client {
  commands: Collection<any, ICommand>;
  cooldowns: Collection<any, any>;
}
