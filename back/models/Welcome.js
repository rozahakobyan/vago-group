import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

class Welcome extends Model {

}

Welcome.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'welcome',
    modelName: 'welcome'
})

export default Welcome;