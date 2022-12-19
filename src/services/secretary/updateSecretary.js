import {
    okResponse,
    conflictResponse
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function updateSecretary(req, res, next) {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phoneNumber, branchId } = req.body;
        const checkSecretary = await prisma.secretary.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!checkSecretary) {
            return conflictResponse(res, 'Secretary is not exists');
        }
        const updatedSecretary = await prisma.secretary.update({
            where: {
                id: parseInt(id),
            },
            data: {
                firstName: firstName ? firstName : checkSecretary.firstName,
                lastName: lastName ? lastName : checkSecretary.lastName,
                email: email ? email : checkSecretary.email,
                phoneNumber: phoneNumber ? phoneNumber : checkSecretary.phoneNumber,
                branchId: branchId ? parseInt(branchId) : checkSecretary.branchId,
            },
        });
        return okResponse(
            res,
            'Secretary updated successfully',
            updatedSecretary,
        );
    } catch (err) {
        next(err);
    }
}