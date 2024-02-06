import { DataTypes } from "sequelize";
import Reservation from "./Reservation.model.js";
import sequelize from "../config.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(50),
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
        },
        password: {
            type: DataTypes.STRING(255),
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);

export default User;