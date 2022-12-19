import { okResponse, badRequestResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function deleteBranch(req, res, next) {
    try {
        const { id } = req.params;
        const checkBranch = await prisma.branch.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!checkBranch) {
            return badRequestResponse(res, "Branch not found");
        }
        await prisma.branch.delete({
            where: {
                id: parseInt(id),
            },
        });
        return okResponse(res, "Branch deleted successfully");
    } catch (err) {
        next(err);
    }
}