import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";

class Packages extends Model{

}

Packages.init({
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    standard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    activePage: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "packages",
    modelName: "packages"
})

export default Packages;