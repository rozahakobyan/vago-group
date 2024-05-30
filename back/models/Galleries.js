import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";

class Galleries extends Model { }

Galleries.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        src: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        pageGallery: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'galleries',
        modelName: 'galleries'
    }
)

export default Galleries;