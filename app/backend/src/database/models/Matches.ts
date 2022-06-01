import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: 'matches',
});
Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});
Teams.hasMany(Matches, {
  foreignKey: 'id',
  as: 'homeMatch',
});
Teams.hasMany(Matches, {
  foreignKey: 'id',
  as: 'awayMatch',
});
export default Matches;
