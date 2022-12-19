import { okResponse, badRequestResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function addWorkdays(req, res, next) {
    try {
        const { doctorId, day } = req.body;
        const checkWorkday = await prisma.workdays.findFirst({
            where: {
                doctorId: parseInt(doctorId),
                day,
            },
        });
        if (checkWorkday) {
            return badRequestResponse(res, "Workday is already exists");
        }
        const newWorkday = await prisma.workdays.create({
            data: {
                doctorId: parseInt(doctorId),
                day,
                state: 'available',
            },
        });

        return okResponse(res, "Workday added successfully", newWorkday);
    } catch (err) {
        next(err);
    }
}