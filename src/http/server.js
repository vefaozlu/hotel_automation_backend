import RedisStore from "connect-redis";
import express, { Router } from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import client from "../../redis/config.js";
import isLoggedIn from "../utils/isLoggedIn.js";
import adminHotelRouter from "./routers/admin_hotel.router.js";
import adminRoomRouter from "./routers/admin_room.router.js";
import authRouter from "./routers/auth.router.js";
import adminReservationRouter from "./routers/admin_reservation.router.js";
import adminRoomTypeRouter from "./routers/admin_roomType.router.js";
import apiReservationsRouter from "./routers/api_reservation.router.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

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

app.use("/auth", authRouter);
app.use("/admin/hotels", isLoggedIn, adminHotelRouter);
app.use("/admin/roomtypes", isLoggedIn, adminRoomTypeRouter);
app.use("/admin/reservations", isLoggedIn, adminReservationRouter);
app.use("/api/reservations", apiReservationsRouter);

app.use("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

export default app;
