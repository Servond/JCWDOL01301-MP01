import { AuthController } from "@/controllers/auth.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AuthRoute {
    private router: Router;
    private Auth: AuthController;

    constructor() {
      this.Auth = new AuthController();
      this.router = Router();
      this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.Auth.registration)
        this.router.post('/login', this.Auth.login)
      }

      getRouter(): Router {
        return this.router;
      }
}