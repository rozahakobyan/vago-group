import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

class Achievements extends Model {

}

Achievements.init({
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
        type: DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'achievements',
    modelName: 'achievements'
})

export default Achievements;