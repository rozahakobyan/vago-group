import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";

class Prices extends Model{

}

Prices.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    advanced: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    premium: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    standard: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "prices",
    modelName: "prices"
})

export default Prices;