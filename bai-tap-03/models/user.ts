import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../src/config/db";

export interface IUserAttributes {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, "id"> {}

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public address!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

export default User;
