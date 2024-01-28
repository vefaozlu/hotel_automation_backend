import RedisStore from "connect-redis";
import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import client from "../../redis/config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../public")));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxage: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
    store: new RedisStore({ client: client }),
  })
);

app.use(passport.authenticate("session"));

export default app;
