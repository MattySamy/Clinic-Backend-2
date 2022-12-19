import { Router } from "express";
import * as SecretaryService from "../services/secretary/index.js";
import JoiMiddleware from "../helpers/middlewares/joiMiddleware.js";
import addWorkdaysSchema from "../helpers/schemas/addWorkdays.schema.js";
import addSecretarySchema from "../helpers/schemas/addSecretary.schema.js";
const secretaryRouter = Router();

secretaryRouter.get("/", SecretaryService.getAllWorkdays);
secretaryRouter.get("/:id", SecretaryService.getWorkdayById);
secretaryRouter.post("/", JoiMiddleware(addWorkdaysSchema), SecretaryService.addWorkdays);
secretaryRouter.delete("/:id", SecretaryService.deleteWorkdays);
secretaryRouter.patch("/:id", SecretaryService.updateWorkdays);
secretaryRouter.post("/addSecretary", JoiMiddleware(addSecretarySchema), SecretaryService.addSecretary);
secretaryRouter.get("/getAllSec", SecretaryService.getAllSec);
secretaryRouter.get("/getSecById/:id", SecretaryService.getSecById);
secretaryRouter.delete("/deleteSecretary/:id", SecretaryService.deleteSecretary);
secretaryRouter.patch("/updateSecretary/:id", SecretaryService.updateSecretary);
export default secretaryRouter;