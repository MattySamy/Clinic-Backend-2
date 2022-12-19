import { Router } from "express";
import * as BranchService from "../services/branch/index.js";
import JoiMiddleware from "../helpers/middlewares/joiMiddleware.js";
import addBranchSchema from "../helpers/schemas/addBranch.schema.js";
// import multer from 'multer';
// import { join } from 'path';
const branchRouter = Router();
// const storageEngine = multer.diskStorage({
//     destination: (req, file, func) => {
//         if (file.fieldname == "image") {
//             func(null, join(process.cwd(), "uploads/image"));
//         }
//     },
//     filename: (req, file, cb) => {
//         const filename = `${file.originalname}`;
//         cb(null, filename);
//     },
// });
// const upload = multer({
//     storage: storageEngine,
//     fileFilter: (req, file, cb) => {
//         console.log(file.mimetype);
//         if (
//             file.mimetype === 'image/jpeg' ||
//             file.mimetype === 'image/jpg' ||
//             file.mimetype === 'image/png' ||
//             file.mimetype === 'image/gif'
//         ) {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             req.fileError = 'Only .jpeg, .jpg, .png and .gif format allowed!';
//         }
//     },
// });

branchRouter.get("/", BranchService.getAllBranches);
branchRouter.get("/:id", BranchService.getBranchById);
branchRouter.post("/", JoiMiddleware(addBranchSchema), BranchService.addBranch);
branchRouter.patch("/:id", BranchService.updateBranch);
branchRouter.delete("/:id", BranchService.deleteBranch);
export default branchRouter;