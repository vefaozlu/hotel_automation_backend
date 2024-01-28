import { DataTypes } from "sequelize";
import sequelize from "config.js";

const Auth = sequelize.define(
    "Auth",
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
            type: DataTypes.STRING(50),
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);

export default Auth;