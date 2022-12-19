import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function deleteDoctor(req, res, next) {
    try {
        const { id } = req.params;
        const doctor = await prisma.doctor.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!doctor) {
            return badRequestResponse(res, 'Doctor not found');
        }
        await prisma.doctor.delete({
            where: {
                id: parseInt(id),
            },
        });
        return okResponse(res, 'Doctor deleted successfully');
    } catch (err) {
        next(err);
    }
}