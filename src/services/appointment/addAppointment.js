import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function addAppointment(req, res, next) {
    try {
        let { doctorId, patientId, branchId, day } = req.body;
        const checkAppointment = await prisma.appointment.findUnique({
            where: {
                unique_app: {
                    doctorId: parseInt(doctorId),
                    patientId: parseInt(patientId),
                    branchId: parseInt(branchId),
                },
            },
        });
        const countOfApps = await prisma.appointment.aggregate({
            _count: {
                day: true,
            }
        });
        console.log(countOfApps._count.day);
        if (countOfApps._count.day >= 10) {
            await prisma.workdays.update({
                where: {
                    day_ID: {
                        doctorId: parseInt(doctorId),
                        day: day,
                    },
                },
                data: {
                    state: 'unavailable',
                },
            });
            // workday must be updated to unavailable error unique
            return conflictResponse(res, 'Doctor is not available in this day');
        }
        if (checkAppointment) {
            return conflictResponse(res, 'Appointment is already exists');
        }
        const newAppointment = await prisma.appointment.create({
            data: {
                doctorId: parseInt(doctorId),
                patientId: parseInt(patientId),
                branchId: parseInt(branchId),
                day,
            },
        });
        return okResponse(
            res,
            'Appointment created successfully',
            newAppointment,
        );
    } catch (err) {
        next(err);
    }
}