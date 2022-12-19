import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
import bcrypt from 'bcrypt';
import createAccessToken from '../../helpers/functions/createAccessToken.js';
// import fs from 'fs';
export async function register(req, res, next) {
    try {
        const {
            firstName,
            lastName,
            password,
            email,
            phoneNumber,
            degree,
            experience,
            skills,
            certifications,
            branchId,
            image,
        } = req.body;
        const { Twitter, Facebook, Instagram, LinkedIn } = req.body;
        // let path2;
        // path2 = `uploads/image/${req.file.filename}`;
        const checkEmail = await prisma.doctor.findUnique({
            where: {
                email,
            },
        });
        if (checkEmail) {
            // fs.unlinkSync(path2);
            return conflictResponse(res, 'Email is already exists');
        }
        const encryptedPassword = await bcrypt.hash(password, 16);
        const newDoctor = await prisma.doctor.create({
            data: {
                firstName,
                lastName,
                password: encryptedPassword,
                email,
                phoneNumber,
                image: image,
                degree,
                experience,
                skills,
                certifications,
                Twitter,
                Facebook,
                Instagram,
                LinkedIn,
                branchId,
            },
        });
        const newToken = await prisma.token.create({
            data: {
                userId: newDoctor.id,
            },
        });
        const accessToken = createAccessToken(newDoctor.id, newToken.id);
        delete newDoctor.password;
        return okResponse(res, 'User created successfully', {
            ...newDoctor,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
}