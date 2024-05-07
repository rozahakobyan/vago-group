import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import Translation from "./Translation.js";

class Projects extends Model{

}

Projects.init({
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "ended"),
        defaultValue: "pending",
        allowNull: false,
    }
},{
    sequelize,
    tableName: "projects",
    modelName: "projects"
})

Projects.belongsTo(Translation,
    {
        foreignKey: "translationId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Translation.hasMany(Projects,
    {
        foreignKey: 'translationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default Projects