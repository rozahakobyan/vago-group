import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";

class Banner extends Model {

}

Banner.init({
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
    homeImage: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    constructionImage: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    employmentAgencyImage: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    logisticImage: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'banner',
    modelName: 'banner'
})

export default Banner;