import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";

class MinimalPrice extends Model{

}

MinimalPrice.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    eur: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usd: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rub: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amd: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    minKm: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    min: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "minimalPrice",
    modelName: "minimalPrice"
})

export default MinimalPrice;