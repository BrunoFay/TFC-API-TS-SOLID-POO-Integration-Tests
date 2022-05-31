import { Model, DataTypes } from 'sequelize';
import db from '.';

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
    field:'home_team'
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field:'home_team_goals'
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field:'away_team'
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field:'away_team_goals'
  },
  inProgress: {
    type:DataTypes.BOOLEAN,
    field:'in_progress'
  },
}, {
  sequelize: db,
  underscored: true,
  modelName:'matches',
  timestamps: false,
});

export default Matches;
