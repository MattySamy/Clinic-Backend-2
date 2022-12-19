import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function getAllSec(req, res, next) {
    try {
        const secretaries = await prisma.secretary.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
                branch: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phoneNumber: true,
                        email: true,
                        image: true,
                    },
                },
            },
        });
        return okResponse(res, 'Secretaries fetched successfully', secretaries);
    } catch (err) {
        next(err);
    }
}