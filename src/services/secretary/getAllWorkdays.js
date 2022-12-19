import { prisma } from '../../index.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function getAllWorkdays(req, res, next) {
    try {
        const workdays = await prisma.workdays.findMany();
        return okResponse(res, 'Workdays fetched successfully', workdays);
    } catch (err) {
        next(err);
    }
}