import { API_KEY, FE_URL } from '@/config';
import { User } from '@/interface/user.interface';
import { sign } from 'jsonwebtoken';
import path from 'path';
// import { Service } from 'typedi';
import fs from "fs"
import * as handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';
import prisma from '@/prisma';

const generateReferralCode = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// @Service()
export class AuthQuery {
  private sendRegistrationEmail = async (user: User) => {
    try {
      const payload = { name: user.name, isVerified: user.isVerified, };
      const token = sign(payload, String(API_KEY), { expiresIn: "1hr" });
      const templatePath = path.join(__dirname, "../templates", "registrationEmail.hbs");
      const urlVerify = `${FE_URL}/verify?token=${token}`;
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ email: user.email, url: urlVerify,});
      await transporter.sendMail({
        from: "sender address",
        to: user.email,
        subject: "welcome to event website",
        html,
      });
    } catch (error) {
      throw error;
    }
  }

  public registerQuery = async (
    name: string,
    email: string,
    password: string,
  ): Promise<User> => {
    try {
      const referralCode = generateReferralCode(8);
      const trans = await prisma.$transaction(async (prisma) => {
        try {
          const user = await prisma.user.create({
            data: {
              name,
              email,
              password,
              roleId: 1,
              referral_code: referralCode,
              isVerified: false
            }
          });
          await this.sendRegistrationEmail(user);
          return user;
        } catch (error) {
          throw error;
        }
      });
      return trans;
    } catch (error) {
      throw error;
    }
  }

  public verifyQuery = async (email: string): Promise<void> => {
    try {
      await prisma.$transaction(async (prisma) => {
        try {
          await prisma.user.update({
            data: { isVerified: true },
            where: { email }
          });
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}