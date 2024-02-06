import clc from "cli-color";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import client from "../redis/config.js";
import app from "./http/server.js";
import sequelizeInit from "../sequelize/models/init.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    console.log(clc.blueBright("Connecting to redis ... !"));

    //  Connect redis

    await client.connect();

    console.log(clc.green("Connected to redis !"));

    console.log(clc.blueBright("Models initiliazing ... !"));

    //  Connect postgres and initialize models

    await sequelizeInit();

    console.log(clc.green("Models initiliazed !"));

    //  Start the server

    app.listen(port, () => {
      console.log(clc.greenBright(`App is running on port ${port}`));
    });
  } catch (e) {
    console.log(clc.red(e));
  }
};

main();
