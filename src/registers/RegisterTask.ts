import { Client } from "discord.js";
import cron from "node-cron";
import { DailyTask } from "../tasks/Daily";
import { WouafTask } from "../tasks/Wouaf";

export const RegisterTasks = (client: Client<true>) => {
  cron.schedule("0 11,17 * * *", () => WouafTask(client), {
    scheduled: true,
    timezone: "Europe/Paris"
  });

  cron.schedule("0 14 * * *", () => DailyTask(client), {
    scheduled: true,
    timezone: "Europe/Paris"
  });
};
