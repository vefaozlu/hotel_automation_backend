import sequelize from "../config.js";
import Admin from "./Admin.model.js";
import Auth from "./Auth.model.js";
import Hotel from "./Hotel.model.js";
import Reservation from "./Reservation.model.js";
import ReservationStatus from "./ReservationStatus.model.js";
import Role from "./Role.model.js";
import Room from "./Room.model.js";
import RoomType from "./RoomType.model.js";
import Visitor from "./Visitor.model.js";

async function sequelizeInit() {
  try {
    sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  await Admin.sync({ alter: true });
  await Auth.sync({ alter: true });
  await Hotel.sync({ alter: true });
  await Reservation.sync({ alter: true });
  await ReservationStatus.sync({ alter: true });
  await Role.sync({ alter: true });
  await Room.sync({ alter: true });
  await RoomType.sync({ alter: true });
  await Visitor.sync({ alter: true });
}
export default sequelizeInit;
