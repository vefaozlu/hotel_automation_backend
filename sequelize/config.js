import "dotenv/config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialect: "postgres",
  dialectOptions: { useUTC: false },
  timezone: "+03:00",
});

export default sequelize;
