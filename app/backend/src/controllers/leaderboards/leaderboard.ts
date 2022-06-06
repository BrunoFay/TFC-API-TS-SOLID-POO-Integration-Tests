import { RequestHandler } from 'express';
import { LeaderBoardService } from '../../types/leaderBoard';

class LeaderBoardController {
  private leaderBoardService: LeaderBoardService;
  constructor(leaderBoardService: LeaderBoardService) {
    this.leaderBoardService = leaderBoardService;
  }

  getAll: RequestHandler = async (req, res, next) => {
    try {
      const leaderBoard = await this.leaderBoardService.getAll();
      return res.status(200).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderBoardController;
