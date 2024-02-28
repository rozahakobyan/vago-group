import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize.js";

class Massagers extends Model {
    static async sync(options) {
        await super.sync(options);
        await Massagers.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                id: 1,
                name: "Facebook",
                icon: "fb.png"
            }
        })

        await Massagers.findOrCreate({
            where: {
                id: 2
            },
            defaults: {
                id: 2,
                name: "Instagram",
                icon: "ins.png"
            }
        })

        await Massagers.findOrCreate({
            where: {
                id: 3
            },
            defaults: {
                id: 3,
                name: "Telegram",
                icon: "tg.png"
            }
        })

        await Massagers.findOrCreate({
            where: {
                id: 4
            },
            defaults: {
                id: 4,
                name: "WhatsApp",
                icon: "wp.png"
            }
        })
    }
}

Massagers.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'massagers',
        modelName: 'massagers'
    })

export default Massagers;