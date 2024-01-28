import { DataTypes } from "sequelize";
import sequelize from "config.js";

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
        address: {
            type: DataTypes.STRING(200),
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);

export default Hotel;