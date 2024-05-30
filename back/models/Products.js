import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";
import Translation from "./Translation.js";

class Products extends Model {

}

Products.init({
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
    price: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    currency: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'products',
    modelName: 'products'
})


Products.belongsTo(Translation,
    {
        foreignKey: "translationId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Translation.hasMany(Products,
    {
        foreignKey: 'translationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default Products;