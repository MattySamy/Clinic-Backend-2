import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getAllDoctors(req, res, next) {
    try {
        const doctors = await prisma.doctor.findMany({
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
                    },
                },
            },
        });
        return okResponse(res, 'All Doctors are fetched successfully', doctors);
    } catch (err) {
        next(err);
    }
}