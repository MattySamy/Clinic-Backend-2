import {
    okResponse,
    badRequestResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function getBranchById(req, res, next) {
    try {
        const { id } = req.params;
        const checkBranch = await prisma.branch.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                name: true,
                address: true,
                email: true,
                phoneNumber: true,
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
            }
        });
        if (!checkBranch) {
            return badRequestResponse(res, 'Branch not found');
        }
        return okResponse(res, 'Branch fetched successfully', checkBranch);
    } catch (err) {
        next(err);
    }
}