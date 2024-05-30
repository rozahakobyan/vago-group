import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize.js";
import Contacts from "./Contacts.js";
import Massagers from "./Massagers.js";

class ContactsMassager extends Model {

}

ContactsMassager.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'contactsMassager',
        modelName: 'contactsMassager'
    }
)

ContactsMassager.belongsTo(Contacts,
    {
        foreignKey: "contactId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })
Contacts.hasMany(ContactsMassager,
    {
        foreignKey: 'contactId',
        as: "massagersList",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

ContactsMassager.belongsTo(Massagers,
    {
        foreignKey: "massagerId",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })

Massagers.hasMany(ContactsMassager,
    {
        foreignKey: 'massagerId',
        as: "massager",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    });

export default ContactsMassager;