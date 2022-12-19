import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
// import fs from 'fs';
export async function addDoctor(req, res, next) {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            degree,
            experience,
            skills,
            certifications,
            image,
        } = req.body;
        const { Twitter, Facebook, Instagram, LinkedIn } = req.body;
        const { branchId } = req.body;
        // let path2;
        // path2 = `${req.file.filename}`;
        const checkEmail = await prisma.doctor.findUnique({
            where: {
                email,
            },
        });
        if (checkEmail) {
            // fs.unlinkSync(path2);
            return conflictResponse(res, 'Email is already exists');
        }
        const newDoctor = await prisma.doctor.create({
            data: {
                firstName,
                lastName,
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
                branchId: parseInt(branchId),
            },
        });
        delete newDoctor.password;
        return okResponse(res, 'Doctor Added successfully', {
            ...newDoctor,
        });
    } catch (err) {
        next(err);
    }
}