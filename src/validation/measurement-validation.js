// measurement-validation.js

import Joi from "joi";

const insertMeasurementValidation = Joi.object({
    clothingType: Joi.string().max(255).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    img: Joi.string().max(255).required(),
    username: Joi.string().max(255).required(),
});

const updateMeasurementValidation = Joi.object({
    chestCircumference: Joi.number().required(),
    bodyCircumference: Joi.number().required(),
    bodyLength: Joi.number().required(),
    shoulderWidth: Joi.number().required(),
    username: Joi.string().max(255).required(),
});

export {
    insertMeasurementValidation,
    updateMeasurementValidation,
};
