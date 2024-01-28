import { DataTypes } from "sequelize";
import sequelize from "config.js";

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
        }
    }
);

export default RoomType;