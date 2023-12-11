import { DataTypes } from "sequelize";
import { Database } from "../Database";

export const Channels = Database.define("channels", {
  guild: {
    type: DataTypes.STRING,
    unique: true
  },
  alert: {
    type: DataTypes.STRING
  }
});
