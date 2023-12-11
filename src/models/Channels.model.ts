import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class Channels extends Model<InferAttributes<Channels>, InferCreationAttributes<Channels>> {
  declare guild: string;
  declare alerts?: string;
  declare news?: string;
}
