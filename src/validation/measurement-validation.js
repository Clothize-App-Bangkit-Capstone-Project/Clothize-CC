import Joi from "joi";

const insertMeasurementValidation = Joi.object({
    clothing_type: Joi.string().max(100).required(),
    clothing_size: Joi.string().max(6).required(),
    body_circumstances: Joi.number().integer().required(),
    shoulder_width: Joi.number().integer().required(),
    body_length: Joi.number().integer().required(),
    chest_circumstances: Joi.number().integer().required(),
    gender: Joi.string().max(100).required(),
    height: Joi.number().integer().required(),
    weight: Joi.number().integer().required(),
});

const getAllMeasurements = Joi.string().max(255).required();

const getSpesificMeasurements = Joi.number().integer().required()

const uploadPictureMeasurementsValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    picture: Joi.string().max(255).required(),
});

export {
    getAllMeasurements, getSpesificMeasurements, insertMeasurementValidation, uploadPictureMeasurementsValidation
};

