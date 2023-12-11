import { SlashCommandBuilder } from "discord.js";

export interface ICommand {
  data: SlashCommandBuilder;
  cooldown: number;
  execute: Function;
}
