import Joi from "joi";

const orderValidation = Joi.object({
    tailorName: Joi.string().max(255).required(),
    customerUsername: Joi.string().max(255).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    service: Joi.string().max(255).required(),
    clothingSize: Joi.string().max(10).required(),
    clothingColor: Joi.string().max(100).required(),
    clothingModel: Joi.string().uri().required(),
    qty: Joi.number().integer().required(),
    orderEstimation: Joi.number().integer().required(),
});

const usernameValidation = Joi.string().max(255).required();
const orderIdValidation = Joi.string().max(255).required();

export {
    orderValidation,
    usernameValidation,
    orderIdValidation
};
