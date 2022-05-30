import { Model,DataTypes } from "sequelize/types";
import db from '.'

class Users extends Model{
  username:string;
  password:string;
  role:string;
  email:string;

}

Users.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING
},{
  sequelize: db,
  underscored: true,
  timestamps: false,
})

export default Users;