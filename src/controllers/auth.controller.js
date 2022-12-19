import { Router } from 'express';
import loginSchema from '../helpers/schemas/login.schema.js';
import registerSchema from '../helpers/schemas/register.schema.js';
import addDoctorSchema from '../helpers/schemas/addDoctor.schema.js';
import * as AuthService from '../services/auth/index.js';
import JoiMiddleware from '../helpers/middlewares/joiMiddleware.js';
import authenticateWithJWT from '../helpers/functions/authenticateWithJWT.js';
// import { join } from 'path';
// import multer from 'multer';
const authRouter = Router();
// const storageEngine = multer.diskStorage({
//     destination: (req, file, func) => {
//         // if (file.fieldname == "backdrop") {
//         //     func(null, join(process.cwd(), "uploads/backdrop"));
//         // }
//         if (file.fieldname == 'image') {
//             func(null, join(process.cwd(), 'uploads/image'));
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
authRouter.post('/login', JoiMiddleware(loginSchema), AuthService.login);
authRouter.post(
    '/register',
    JoiMiddleware(registerSchema),
    AuthService.register,
);
authRouter.post('/logout', authenticateWithJWT, AuthService.logout);
authRouter.patch('/updateDoctor/:id', AuthService.updateDoctor);
authRouter.delete('/deleteDoctor/:id', AuthService.deleteDoctor);
authRouter.get('/getAllDoctors', AuthService.getAllDoctors);
authRouter.get('/getDoctorById/:id', AuthService.getDoctorById);
authRouter.post(
    '/addDoctor',
    JoiMiddleware(addDoctorSchema),
    AuthService.addDoctor,
);
export default authRouter;