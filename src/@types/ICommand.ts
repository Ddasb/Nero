export interface ICommand {
  data: any;
  cooldown: number;
  execute: Function;
}
