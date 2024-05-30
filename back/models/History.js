import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";
import Translation from "./Translation.js";

class History extends Model {

}

History.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'history',
    modelName: 'history'
})


History.belongsTo(Translation,
    {
        foreignKey: "translationId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Translation.hasMany(History,
    {
        foreignKey: 'translationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default History;