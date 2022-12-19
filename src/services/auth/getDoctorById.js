import {
    okResponse,
    badRequestResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function getDoctorById(req, res, next) {
    try {
        const { id } = req.params;
        const checkDoctor = await prisma.doctor.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
                image: true,
                degree: true,
                experience: true,
                skills: true,
                certifications: true,
                Twitter: true,
                Facebook: true,
                Instagram: true,
                Linkedin: true,
                branchId: true,
                workdays: {
                    where: {
                        state: 'available',
                    },
                    select: {
                        id: true,
                        day: true,
                        doctorId: true,
                        state: true,
                    }
                },
            },
        });
        if (!checkDoctor) {
            return badRequestResponse(res, 'Doctor not found');
        }
        return okResponse(res, 'Doctor fetched successfully', checkDoctor);
    } catch (err) {
        next(err);
    }
}