import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Channels extends Model {
  @Column
  declare guild: string;

  @Column
  declare alerts: string;

  @Column
  declare news: string;
}
