import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize.js";
import md5 from "md5";

const { PASSWORD_SECRET } = process.env;

class Users extends Model {
  static passwordHash(string) {
    return md5(md5(string) + PASSWORD_SECRET);
  }

  static async sync(options) {
    await super.sync(options);
    await Users.findOrCreate({
      where: {
        id: 1
      },
      defaults: {
        id: 1,
        firstName: 'Roza',
        lastName: 'Hakobyan',
        email: 'rhakobyan751@gmail.com',
        password: '123456789',
        role: 'admin',
        status:'active'
      }
    })

    await Users.findOrCreate({
      where: {
        id: 2
      },
      defaults: {
        id: 2,
        firstName: 'Roza',
        lastName: 'Hakobyan',
        email: 'rhakobyan752@gmail.com',
        password: '123456789',
        role: 'user',
        status:'active'
      }
    })
  }
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,

  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,

  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,

  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    set(val) {
      if (val) {
        this.setDataValue('password', Users.passwordHash(val));
      }
    },
    get() {
      return undefined
    }
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const photo = this.getDataValue('photo');
      if (photo) {
        return photo;
      }
      const email = this.getDataValue('email');

      if (email) {
        return `avatar.png`
      }
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'pending'),
    defaultValue: 'pending',
    allowNull: false,
  },
  verification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isOauth:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
},
  {
    sequelize,
    tableName: 'users',
    modelName: 'users'
  })

export default Users