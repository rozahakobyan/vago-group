import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize.js";

class Works extends Model {

}

Works.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        hoursWeek:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'works',
        modelName: 'works'
    })

export default Works;