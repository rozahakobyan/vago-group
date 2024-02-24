import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

class Products extends Model {

}

Products.init({
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
    price: {
        type: DataTypes.BIGINT(),
        allowNull: false,
    },
    image: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'products',
    modelName: 'products'
})

export default Products;