import { API_KEY } from '@/config'
import { HttpException } from '@/exceptions/HttpException'
// import { Auth } from '@/interface/auth.interface'
import prisma from '@/prisma'
import { compare, genSalt, hash } from 'bcrypt'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

const generateReferralCode = (length = 8) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

export class AuthController {
    async registration(req: Request, res: Response ){
        const { name, email, password } = req.body

        const existingUser = await prisma.user.findFirst({
            where: {
              OR: [
                { email },
                { name },
              ],
            },
          });
      
        if (existingUser) {
            let message;
            if (existingUser.email === email) {
              message = "Email already in use";
            } else {
              message = "Username already taken";
            }
            return res.status(400).json({ message });
          }

      const salt = await genSalt(10);
      const hashPass = await hash(password, salt);

        const result = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPass,
                roleId: 1,
                isVerified: false,
                referral_code: generateReferralCode()
            }
        })
        res.status(200).json({
            message: "Register success",
            data: result,
        });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const findUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
      
            if (!findUser)
              throw new HttpException(500, "User with that email doesn't exist");
      
            const isValid = await compare(password, findUser.password);
      
            if (!isValid) throw new HttpException(500, "Incorrect password");
      
            const token = sign({ userId: findUser.id }, String(API_KEY), { expiresIn: "1hr" });
      
            return res.status(201).json({
                message: "get token",
                token
            })
          } catch (err) {
            res.status(500).json({
                message: "SALAH PASSWORD WOY",
                err
            })
          }
    }
}