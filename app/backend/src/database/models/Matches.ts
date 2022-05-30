import { Model, DataTypes } from "sequelize/types";
import db from '.'

class Matches extends Model {
  home_team: number;
  home_team_goals: number;
  away_team: number;
  away_team_goals: number;
  in_progress: boolean
}

Matches.init({
  home_team: DataTypes.INTEGER,
  home_team_goals: DataTypes.INTEGER,
  away_team: DataTypes.INTEGER,
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.BOOLEAN
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
})

export default Matches;