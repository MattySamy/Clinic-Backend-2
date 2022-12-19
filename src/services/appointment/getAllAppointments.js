import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function getAllAppointments(req, res, next) {
    try {
        const Appointments = await prisma.appointment.findMany({
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
                        gender: true,
                    },
                },
                branch: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phoneNumber: true,
                        email: true,
                    }
                },
            },
        });
        return okResponse(res, "All Appointments are fetched successfully", Appointments);
    } catch (err) {
        next(err);
    }
}