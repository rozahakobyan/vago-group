import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";
import Translation from "./Translation.js";

class Services extends Model {

}

Services.init({
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
    number: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'services',
    modelName: 'services'
})

Services.belongsTo(Translation,
    {
        foreignKey: "translationId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Translation.hasMany(Services,
    {
        foreignKey: 'translationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default Services;