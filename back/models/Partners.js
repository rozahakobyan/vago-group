import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

class Partners extends Model {

}

Partners.init({
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
}, {
    sequelize,
    tableName: 'partners',
    modelName: 'partners'
})

export default Partners;