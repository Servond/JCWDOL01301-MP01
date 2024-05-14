import { AuthAction } from "@/actions/auth.action";
import { Auth } from "@/interface/auth.interface";
import { Request, Response, NextFunction } from "express"


export class AuthController {
    private auth = new AuthAction

    public registerController = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { name, email, password, referralCode }: Auth = req.body

            const result = await this.auth.registerAction({
                name,
                email,
                password,
            })

            res.status(200).json({
                message: "Register success",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    public loginController = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const { email, password }: Auth = req.body;
    
          const result = await this.auth.loginAction({ email, password });
    
          res.status(200).json({
            message: "Login success",
            data: result,
          });
        } catch (err) {
          next(err);
        }
      };
    
      public refreshTokenController = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const { email } = req.user;
    
          const result = await this.auth.refreshTokenAction(email);
    
          res.status(200).json({
            message: "Refresh token success",
            data: result,
          });
        } catch (err) {
          next(err);
        }
      };

    public verifyController = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const email = req.user?.email;
    
            if (!email) {
                return res.status(401).json({ message: "Unauthorized" });
            }
    
            await this.auth.verifyAction(email);
    
            // No additional return statement needed here
    
            res.status(200).json({
                message: "Verify success",
            });
        } catch (err) {
            next(err);
        }
    };
    
}

