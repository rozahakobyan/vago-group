import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

class LoginImage extends Model {

}

LoginImage.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    image: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'loginImage',
    modelName: 'loginImage'
})

export default LoginImage;