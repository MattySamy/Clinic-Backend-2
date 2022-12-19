import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function addSecretary(req, res, next) {
    try {
        let { firstName, lastName, email, phoneNumber, branchId } = req.body;
        const checkSecretary = await prisma.secretary.findUnique({
            where: {
                email: email,
            },
        });
        if (checkSecretary) {
            return conflictResponse(res, 'Secretary is already exists');
        }
        const newSecretary = await prisma.secretary.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                branchId: parseInt(branchId),
            },
        });
        return okResponse(
            res,
            'Secretary created successfully',
            newSecretary,
        );
    } catch (err) {
        next(err);
    }
}