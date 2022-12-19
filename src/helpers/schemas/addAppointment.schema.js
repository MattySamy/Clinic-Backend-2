import Joi from "joi";
const addAppointmentSchema = Joi.object({
    patientId: Joi.number().required().messages({
        "string.empty": "Patient ID cannot be an empty field",
        "any.required": "Patient ID is a required field",
    }),
    doctorId: Joi.number().required().messages({
        "string.empty": "Doctor ID cannot be an empty field",
        "any.required": "Doctor ID is a required field",
    }),
    branchId: Joi.number().required().messages({
        "string.empty": "Branch ID cannot be an empty field",
        "any.required": "Branch ID is a required field",
    }),
    day: Joi.string().messages({
        "string.empty": "Day cannot be an empty field",
        "any.required": "Day is a required field",
    }),
});
export default addAppointmentSchema;