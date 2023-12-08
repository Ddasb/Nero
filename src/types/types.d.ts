import { Collection } from "discord.js";
import { ISlashCommand } from "./ISlashCommand";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, ISlashCommand>;
  }
}
