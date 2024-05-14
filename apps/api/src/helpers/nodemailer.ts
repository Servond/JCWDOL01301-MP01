import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASS } from "../config";

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: String(NODEMAILER_EMAIL),
    pass: String(NODEMAILER_PASS),
  },
});
