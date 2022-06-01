import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  username: string;
  password: string;
  role: string;
  email: string;
}

Users.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: 'users',
});

export default Users;
