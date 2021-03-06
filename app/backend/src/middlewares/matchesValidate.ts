import { RequestHandler } from 'express';
import { getTeam } from '../helpers/middlewareHelpers';

class MatchesValidates {
  validateIfTeamsAreDifferents: RequestHandler = (req, res, next) => {
    try {
      const { homeTeam, awayTeam } = req.body;
      if (homeTeam === awayTeam) {
        return res
          .status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  validateIfTeamsExistsInDb: RequestHandler = async (req, res, next) => {
    try {
      const { homeTeam, awayTeam } = req.body;
      const getHomeTeam = await getTeam(homeTeam);
      const getAwayTeam = await getTeam(awayTeam);

      if (!getHomeTeam || !getAwayTeam) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesValidates;
