import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  team_name!:string;
}

Teams.init({
  team_name: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

export default Teams;
