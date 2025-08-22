import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "demo",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "1234",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3307,
    dialect: "mysql",
  }
);

export default sequelize;
