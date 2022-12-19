import { okResponse, badRequestResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function updateWorkdays(req, res, next) {
    try {
        const { id } = req.params;
        const { state, day, doctorId } = req.body;
        const workday = await prisma.workdays.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!workday) {
            return badRequestResponse(res, "Workday not found");
        }
        const updatedWorkday = await prisma.workdays.update({
            where: {
                id: parseInt(id),
            },
            data: {
                day: day ? day : workday.day,
                doctorId: doctorId ? parseInt(doctorId) : workday.doctorId,
                state: state ? state : workday.state,
            },
        });
        return okResponse(res, "Workday updated successfully", updatedWorkday);
    } catch (err) {
        next(err);
    }
}