import { Collection } from "discord.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      INVITATION_URL: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<any, any>;
    cooldowns: Collection<any, any>;
  }
}
