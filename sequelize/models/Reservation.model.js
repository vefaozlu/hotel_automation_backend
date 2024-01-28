import { DataTypes } from "sequelize";
import sequelize from "config.js";

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
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        visitorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hotelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

export default Reservation;