import { AuthController } from "@/controllers/auth.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AuthRoute {
    private router: Router;
    private Auth: AuthController;
    // private Guard: AuthMiddleware;

    constructor() {
      this.Auth = new AuthController();
      this.router = Router();
    // this.Guard = new AuthMiddleware();
      this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', this.Auth.registerController)
        this.router.post('/login', this.Auth.loginController)
      }

      getRouter(): Router {
        return this.router;
      }
}