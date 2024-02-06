import sequelize from "../config.js";
import User from "./User.model.js";
import Hotel from "./Hotel.model.js";
import Reservation from "./Reservation.model.js";
import Room from "./Room.model.js";
import RoomType from "./RoomType.model.js";

async function sequelizeInit() {
  try {
    sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  await User.sync({ alter: true });
  await Hotel.sync({ alter: true });
  await Reservation.sync({ alter: true });
  await Room.sync({ alter: true });
  await RoomType.sync({ alter: true });
}
export default sequelizeInit;
