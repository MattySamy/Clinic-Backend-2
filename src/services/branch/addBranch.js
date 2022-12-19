import {
    okResponse,
    badRequestResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
// import fs from 'fs';
export async function addBranch(req, res, next) {
    try {
        const {
            name,
            address,
            phoneNumber,
            email,
            image,
        } = req.body;
        // let path1;
        // path1 = `${req.file.filename}`;
        // if (!req.file) {
        //     return badRequestResponse(res, 'Please upload an image');
        // }
        const checkBranch = await prisma.branch.findUnique({
            where: {
                address,
            },
        });
        if (checkBranch) {
            return badRequestResponse(res, 'Branch is already exists');
        }
        const newBranch = await prisma.branch.create({
            data: {
                name,
                address,
                phoneNumber,
                email,
                image: image,
            },
        });
        return okResponse(res, 'Branch created successfully', newBranch);
    } catch (err) {
        next(err);
    }
}