import { Router } from 'express';
import * as PatientService from '../services/patient/index.js';
import registerPatientSchema from '../helpers/schemas/register.patient.schema.js';
import loginPatientSchema from '../helpers/schemas/login.patient.schema.js';
import JoiMiddleware from '../helpers/middlewares/joiMiddleware.js';
import authenticateWithJWT from '../helpers/functions/authenticateWithJWT.js';
// import multer from 'multer';
// import { join } from 'path';
const patientRouter = Router();
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
patientRouter.post('/loginPatient', JoiMiddleware(loginPatientSchema), PatientService.login);
patientRouter.post(
    '/registerPatient',
    JoiMiddleware(registerPatientSchema),
    PatientService.register,
);
patientRouter.post('/logoutPatient', authenticateWithJWT, PatientService.logout);
patientRouter.patch('/updatePatient/:id', PatientService.updatePatient);
patientRouter.delete('/deletePatient/:id', PatientService.deletePatient);
patientRouter.get('/getAllPatients', PatientService.getAllPatients);
patientRouter.get('/getPatient/:id', PatientService.getPatientById);
patientRouter.patch('/resetPassword/:id', PatientService.resetPassword);
patientRouter.post('/forgottenPassword', PatientService.forgottenPassword);
export default patientRouter;