import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

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

export default Services;