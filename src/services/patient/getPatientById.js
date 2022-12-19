import { okResponse, badRequestResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function getPatientById(req, res, next) {
    try {
        const { id } = req.params;
        const checkPatient = await prisma.patient.findUnique({
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
        if (!checkPatient) {
            return badRequestResponse(res, "Patient not found");
        }
        return okResponse(res, "Patient fetched successfully", checkPatient);
    } catch (err) {
        next(err);
    }
}