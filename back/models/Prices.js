import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Translation from "./Translation.js";

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
    activePage: {
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

Prices.belongsTo(Translation,
    {
        foreignKey: "translationId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Translation.hasMany(Prices,
    {
        foreignKey: 'translationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default Prices;