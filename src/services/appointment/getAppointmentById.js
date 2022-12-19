import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function getAppointmentById(req, res, next) {
    try {
        const { id } = req.params;
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                day: true,
                doctor: {
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
                    },
                },
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phoneNumber: true,
                    }
                },
                branch: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phoneNumber: true,
                        email: true,
                    },
                },
            },
        });
        return okResponse(res, "Appointment is fetched successfully", appointment);

    } catch (err) {
        next(err);
    }
}