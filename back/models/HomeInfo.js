import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

class HomeInfo extends Model {

}

HomeInfo.init({
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
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'homeInfo',
    modelName: 'homeInfo'
})

export default HomeInfo;