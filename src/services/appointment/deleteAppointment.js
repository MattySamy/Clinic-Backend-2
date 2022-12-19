import {
    conflictResponse,
    okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function deleteAppointment(req, res, next) {
    try {
        const { id } = req.params;
        const checkAppointment = await prisma.appointment.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!checkAppointment) {
            return conflictResponse(res, 'Appointment not found');
        }
        await prisma.appointment.delete({
            where: {
                id: parseInt(id),
            },
        });
        const count_appointments = await prisma.appointment.aggregate({
            _count: {
                day: true,
            },
        });
        console.log(checkAppointment.doctorId, checkAppointment.day);
        if (count_appointments._count.day < 10) {
            await prisma.workdays.update({
                where: {
                    day_ID: {
                        doctorId: checkAppointment.doctorId,
                        day: checkAppointment.day,
                    },
                },
                data: {
                    state: 'available',
                },
            });
        }
        return okResponse(res, 'Appointment deleted successfully');
    } catch (err) {
        next(err);
    }
}