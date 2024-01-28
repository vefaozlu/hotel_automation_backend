import { DataTypes } from "sequelize";
import sequelize from "config.js";

const ReservationStatus = sequelize.define(
    "ReservationStatus",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING(50),
        },
    }
);

export default ReservationStatus;