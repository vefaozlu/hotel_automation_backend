import sequelize from "../config.js";

async function sequelizeInit() {
  try {
    sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelizeInit;
