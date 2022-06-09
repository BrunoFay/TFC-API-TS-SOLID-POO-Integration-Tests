import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  teamName!:string;
}

Teams.init({
  teamName: { type: DataTypes.STRING, allowNull: false, field: 'team_name' },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: 'teams',
});

export default Teams;
