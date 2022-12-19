import { prisma } from '../../index.js';
import { badRequestResponse, okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function updatePatient(req, res, next) {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, gender, phoneNumber } = req.body;
        const patient = await prisma.patient.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!patient) {
            return badRequestResponse(res, 'Patient not found');
        }
        const updated_Patient = await prisma.patient.update({
            where: {
                id: parseInt(id),
            },
            data: {
                firstName: firstName ? firstName : patient.firstName,
                lastName: lastName ? lastName : patient.lastName,
                email: email ? email : patient.email,
                gender: gender ? gender : patient.gender,
                phoneNumber: phoneNumber ? phoneNumber : patient.phoneNumber,
            },
        });
        return okResponse(res, 'Patient profile updated successfully', updated_Patient);
    } catch (err) {
        next(err);
    }
}