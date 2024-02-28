import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize.js";

class Contacts extends Model {

}

Contacts.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'contacts',
        modelName: 'contacts'
    })

export default Contacts;