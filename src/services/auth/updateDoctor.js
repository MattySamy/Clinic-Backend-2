import { prisma } from '../../index.js';
import {
    badRequestResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import bcrypt from 'bcrypt';
export async function updateDoctor(req, res, next) {
    try {
        const { id } = req.params;
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
        } = req.body;
        const { Twitter, Facebook, Instagram, Linkedin } = req.body;
        const admin = await prisma.doctor.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!admin) {
            return badRequestResponse(res, 'Doctor not found');
        }
        // const isTheSamePassword = await bcrypt.compare(password, admin.password);
        const updated_doctor = await prisma.doctor.update({
            where: {
                id: parseInt(id),
            },
            data: {
                firstName: firstName ? firstName : admin.firstName,
                lastName: lastName ? lastName : admin.lastName,
                email: email ? email : admin.email,
                password: password ?
                    await bcrypt.hash(password, 16) : admin.password,
                phoneNumber: phoneNumber ? phoneNumber : admin.phoneNumber,
                degree: degree ? degree : admin.degree,
                experience: experience ? experience : admin.experience,
                skills: skills ? skills : admin.skills,
                certifications: certifications ?
                    certifications : admin.certifications,
                Twitter: Twitter ? Twitter : admin.Twitter,
                Facebook: Facebook ? Facebook : admin.Facebook,
                Instagram: Instagram ? Instagram : admin.Instagram,
                Linkedin: Linkedin ? Linkedin : admin.Linkedin,
            },
        });
        return okResponse(
            res,
            'Doctor Profile updated successfully',
            updated_doctor,
        );
    } catch (err) {
        next(err);
    }
}