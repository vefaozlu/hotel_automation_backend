import User from "./User.model.js";
import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "approved",
        "current",
        "past",
        "cancelled"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    didUpdated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    visitorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

export default Reservation;
