import "dotenv/config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  { logging: false }
);

export default sequelize;
