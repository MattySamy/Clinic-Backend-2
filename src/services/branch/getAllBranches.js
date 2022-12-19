import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function getAllBranches(req, res, next) {
    try {
        const branches = await prisma.branch.findMany({
            select: {
                id: true,
                name: true,
                address: true,
                phoneNumber: true,
                email: true,
                image: true,
                doctor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phoneNumber: true,
                        image: true,
                        degree: true,
                        experience: true,
                        skills: true,
                        certifications: true,
                        Twitter: true,
                        Facebook: true,
                        Instagram: true,
                        Linkedin: true,
                    },
                },
            },
        });
        return okResponse(res, 'Branches fetched successfully', branches);
    } catch (err) {
        next(err);
    }
}