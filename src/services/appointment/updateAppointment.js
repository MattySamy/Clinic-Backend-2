import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function updateAppointment(req, res, next) {
    try {
        const { id } = req.params;
        const { day, doctorId, patientId, branchId } = req.body;
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!appointment) {
            return conflictResponse(res, 'Appointment not found');
        }
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: parseInt(id),
            },
            data: {
                day: day ? day : appointment.day,
                doctorId: doctorId ? parseInt(doctorId) : appointment.doctorId,
                patientId: patientId ? parseInt(patientId) : appointment.patientId,
                branchId: branchId ? parseInt(branchId) : appointment.branchId,
            },
        });
        return okResponse(res, 'Appointment updated successfully', updatedAppointment);
    } catch (err) {
        next(err);
    }
}