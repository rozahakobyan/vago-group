import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize.js";

class VideoPath extends Model{

}

VideoPath.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    pageVideo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
},{
    sequelize,
    modelName: "videoPath",
    tableName: "videoPath"
})

export default VideoPath;