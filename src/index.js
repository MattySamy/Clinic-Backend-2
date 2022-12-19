import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import logger from './helpers/middlewares/logger.js';
import errorHandler from './helpers/middlewares/errorHandler.js';
import authRouter from './controllers/auth.controller.js';
import patientRouter from './controllers/patient.controller.js';
import branchRouter from './controllers/branch.controller.js';
import appointmentRouter from './controllers/appointment.controller.js';
import secretaryRouter from './controllers/secretary.controller.js';
import registerStrategies from './helpers/functions/registerStrategies.js';
import { join } from 'path';
const prisma = new PrismaClient();
dotenv.config();
const app = express();
registerStrategies();
// var cors = require('cors');

import cors from 'cors';
app.use(cors());

// -- Middlewares --
app.use(express.json());
app.use(logger);
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

// -- Routes --
app.use('/auth', authRouter);
app.use('/patient', patientRouter);
app.use('/branch', branchRouter);
app.use('/appointment', appointmentRouter);
app.use('/secretary', secretaryRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(
        `Server is listening on port http://127.0.0.1:${process.env.PORT}`,
    );
});

export { prisma };