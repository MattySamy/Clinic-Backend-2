import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function getSecById(req, res, next) {
    try {
        const { id } = req.params;
        const secretary = await prisma.secretary.findUnique({
            where: {
                id: parseInt(id),
            },
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
        return okResponse(res, 'Secretary fetched successfully', secretary);
    } catch (err) {
        next(err);
    }
}