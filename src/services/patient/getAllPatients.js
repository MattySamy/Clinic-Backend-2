import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getAllPatients(req, res, next) {
    try {
        const patients = await prisma.patient.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
                image: true,
                gender: true,
                appointments: {
                    select: {
                        id: true,
                        day: true,
                        doctor: {
                            select: {
                                firstName: true,
                                lastName: true,
                            },
                        },
                        branch: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return okResponse(res, 'All Patients are fetched successfully', patients);
    } catch (err) {
        next(err);
    }
}