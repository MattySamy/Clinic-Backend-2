import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function deletePatient(req, res, next) {
    try {
        const { id } = req.params;
        const patient = await prisma.patient.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!patient) {
            return badRequestResponse(res, 'Patient not found');
        }
        await prisma.patient.delete({
            where: {
                id: parseInt(id),
            },
        });
        return okResponse(res, 'Patient deleted successfully');
    } catch (err) {
        next(err);
    }
}