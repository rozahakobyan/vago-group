import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";

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

export default Projects