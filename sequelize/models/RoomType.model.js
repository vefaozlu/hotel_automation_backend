import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import Room from "./Room.model.js";

const RoomType = sequelize.define(
  "RoomType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    description: {
      type: DataTypes.STRING(255),
    },
    room_count: {
      type: DataTypes.INTEGER,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

RoomType.hasMany(Room, {
  foreignKey: "typeId",
});

export default RoomType;
