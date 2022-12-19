import {
    okResponse,
    unAuthorizedResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
import nodemailer from 'nodemailer';
export async function forgottenPassword(req, res, next) {
    try {
        const { email } = req.body;
        const admin = await prisma.patient.findUnique({
            where: {
                email,
            },
        });
        if (!admin) {
            return unAuthorizedResponse(res, 'Invalid email you did not register');
        }
        const transporter = nodemailer.createTransport({
            secure: false,
            service: 'gmail',
            auth: {
                user: 'mostafasamysfsf@gmail.com',
                pass: 'giqhjmnbizkqmcnh',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: 'mostafasamysfsf@gmail.com',
            to: email,
            subject: 'Reset your password',
            text: 'Welcome please reset your password',
            html: `<h1>Reset your password</h1><p>Click on the link below to reset your password</p><a href="http://localhost:3000/reset-password/${admin.id}">Reset password</a>`,
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return okResponse(res, 'Email sent successfully please check your email to reset your password');
    } catch (err) {
        next(err);
    }
}