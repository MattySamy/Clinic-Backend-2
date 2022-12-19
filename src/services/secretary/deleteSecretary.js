import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function deleteSecretary(req, res, next) {
    try {
        const { id } = req.params;
        const checkSecretary = await prisma.secretary.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!checkSecretary) {
            return conflictResponse(res, 'Secretary is not exists');
        }
        const deletedSecretary = await prisma.secretary.delete({
            where: {
                id: parseInt(id),
            },
        });
        return okResponse(
            res,
            'Secretary deleted successfully',
            deletedSecretary,
        );
    } catch (err) {
        next(err);
    }
}