import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function logout(req, res, next) {
    try {
        const { tokenId } = req.user;
        await prisma.tokenPatient.delete({
            where: {
                id: tokenId,
            },
        });
        return okResponse(res, 'Logout successful');
    } catch (err) {
        next(err);
    }
}