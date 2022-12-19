import { okResponse, badRequestResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function deleteWorkdays(req, res, next) {
    try {
        const { id } = req.params;
        const workday = await prisma.workdays.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!workday) {
            return badRequestResponse(res, "Workday not found");
        }
        await prisma.workdays.delete({
            where: {
                id: parseInt(id),
            },
        });
        return okResponse(res, "Workday deleted successfully");
    } catch (err) {
        next(err);
    }
}