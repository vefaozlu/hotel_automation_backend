import { DataTypes } from "sequelize";
import sequelize from "config.js";

const Room = sequelize.define(
    "Room",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        isVacant: {
            type: DataTypes.BOOLEAN,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hotelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        guestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);

export default Room;