import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";

class Translation extends Model{

}

Translation.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    en: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    ru: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    am: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    pl: {
        type: DataTypes.JSON,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'translation',
    tableName: "translation"
})

export default Translation;