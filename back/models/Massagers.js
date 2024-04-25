import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize.js";

class Massagers extends Model {}

Massagers.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        headerIcon: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        footerIcon: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'massagers',
        modelName: 'massagers'
    })

export default Massagers;