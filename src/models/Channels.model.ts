import { DataTypes } from "sequelize";
import { Database } from "../Database";

const Channels = Database.define("channels", {
  guild: {
    type: DataTypes.STRING,
    unique: true
  },
  alert: {
    type: DataTypes.STRING
  }
});
