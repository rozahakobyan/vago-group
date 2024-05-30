import sequelize from "../services/sequelize.js";
import {DataTypes, Model} from "sequelize";
import Translation from "./Translation.js";

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

Banner.belongsTo(Translation,
    {
        foreignKey: "translationId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Translation.hasMany(Banner,
    {
        foreignKey: 'translationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default Banner;