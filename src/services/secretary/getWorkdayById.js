import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getWorkdayById(req, res, next) {
    try {
        const { id } = req.params;
        const workdays = await prisma.workdays.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return okResponse(res, 'Workdays fetched successfully', workdays);
    } catch (err) {
        next(err);
    }
}