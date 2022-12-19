import { okResponse, unAuthorizedResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
export async function resetPassword(req, res, next) {
    try {
        const { newPassword } = req.body;
        const { id } = req.params;
        const patient = await prisma.patient.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!patient) {
            return unAuthorizedResponse(res, "Invalid email you did not register");
        }
        const transporter = nodemailer.createTransport({
            secure: false,
            service: "gmail",
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
            to: patient.email,
            subject: "Password reset successfully",
            text: "Hooraay your password has been reset successfully !",
            html: `<h1>Password reset successfully</h1><p>Click on the link below to login</p><a href="http://localhost:3000/login">Login</a>`,
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        await prisma.patient.update({
            where: {
                id: parseInt(id),
            },
            data: {
                password: await bcrypt.hash(newPassword, 10),
            },
        });
        return okResponse(res, "Password reset successfully");
    } catch (err) {
        next(err);
    }
}