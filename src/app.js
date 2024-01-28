import clc from "cli-color";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import client from "../redis/config.js";
import express from "express";
import sequelizeInit from "../sequelize/models/init.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const port = process.env.PORT || 3000;

const main = async () => {
  const app = express();
  try {
    console.log(clc.blueBright("Connecting to redis ... !"));

    await client.connect();

    console.log(clc.green("Connected to redis !"));

    console.log(clc.blueBright("Models initiliazing ... !"));

    sequelizeInit();

    console.log(clc.green("Models initiliazed !"));

    app.listen(port, () => {
      console.log(clc.greenBright(`App is running on port ${port}`));
    });
  } catch (e) {
    console.log(clc.red(e));
  }
};

main();
