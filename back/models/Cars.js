import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";
import Translation from "./Translation.js";

class Cars extends Model {

}

Cars.init({
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
    image: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fuel: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    transmission: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    bac: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    documents: {
        type:DataTypes.STRING(),
        allowNull: false,
    },
    bonusSystem: {
        type:DataTypes.STRING(),
        allowNull: false,
    },
    rules: {
        type:DataTypes.STRING(),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'cars',
    modelName: 'cars'
})

Cars.belongsTo(Translation,
    {
        foreignKey: "translationId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Translation.hasMany(Cars,
    {
        foreignKey: 'translationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default Cars;