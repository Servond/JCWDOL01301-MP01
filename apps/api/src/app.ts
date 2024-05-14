import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express'; // Assuming these were used in server.ts
import { ErrorMiddleware } from './middleware/error.middleware';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { AuthRoute } from './routers/auth.router';
import { EventRouter } from './routers/event.router';

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    // Error handling (assuming it's in server.ts)
    this.app.use(ErrorMiddleware);
  }

  private handleError(): void {
    // Implement error handling logic here (if needed)
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const authRouter = new AuthRoute()
    const eventRouter = new EventRouter()
    // const eventRouter = new EventRouter()
    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/samples', sampleRouter.getRouter());
    this.app.use('/auth', authRouter.getRouter())
    this.app.use('/event', eventRouter.getRouter())

    // Mount eventRouter
    // this.app.use('/event', eventRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
