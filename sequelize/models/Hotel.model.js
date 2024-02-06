import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import RoomType from "./RoomType.model.js";
import Reservation from "./Reservation.model.js";

const Hotel = sequelize.define(
    "Hotel",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        description: {
            type: DataTypes.STRING(200),
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);

Hotel.hasMany(RoomType, {
    foreignKey: "hotelId",
})

Hotel.hasMany(Reservation, {
    foreignKey: "hotelId",
})

export default Hotel;