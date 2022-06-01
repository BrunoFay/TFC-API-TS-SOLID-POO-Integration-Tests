import * as express from 'express';
import * as cors from 'cors';
import loginRouter from './routes/login';
import teamsRouter from './routes/teams';
import matchesRouter from './routes/matches';
import gerenicError from './middlewares/HandleGenericError';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(loginRouter);
    this.app.use(teamsRouter);
    this.app.use(matchesRouter);
    this.app.use(gerenicError);
    // ..
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Escutando porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
