import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME: string = process.env.DB_NAME || "demo";
const DB_USER: string = process.env.DB_USER || "root";
const DB_PASS: string = process.env.DB_PASS || "1234";
const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_PORT: number = parseInt(process.env.DB_PORT || "3307", 10);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

export default sequelize;
