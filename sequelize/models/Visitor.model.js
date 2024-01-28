import { DataTypes } from "sequelize";
import sequelize from "config.js";

const Visitor = sequelize.define(
    "Visitor",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(50),
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
        }
    }
);

export default Visitor;