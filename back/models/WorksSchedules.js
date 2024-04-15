import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize.js";
import Works from "./Works.js";

class WorksSchedules extends Model {

}

WorksSchedules.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'worksSchedules',
        modelName: 'worksSchedules'
    }
)

WorksSchedules.belongsTo(Works,
    {
        foreignKey: "workId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })
Works.hasMany(WorksSchedules,
    {
        foreignKey: 'workId',
        as: "schedules",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

export default WorksSchedules;