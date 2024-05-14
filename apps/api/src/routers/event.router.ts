// import { SampleController } from '@/controllers/sample.controller';
import { EventController } from '@/controllers/event.controller';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;
  private Guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.Guard = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.Guard.verifyToken,this.eventController.getEventData);
    this.router.get('/:id', this.Guard.verifyToken,this.eventController.getEventDataById);
    this.router.post('/create', this.Guard.verifyToken,this.eventController.createEvent);
    
  }

  getRouter(): Router {
    return this.router;
  }
}