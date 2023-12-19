import Joi from "joi";

const registerTailorValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    name: Joi.string().max(100).optional(),
    address: Joi.string().max(255).optional(),
    phone_number: Joi.string().max(20).optional(),
});

const getTailorValidation = Joi.string().max(255).required();

const updateTailorValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    name: Joi.string().max(100).optional(),
    address: Joi.string().max(255).optional(),
    phone_number: Joi.string().max(20).optional(),
});

const uploadProfilePictureTailorValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    profile_picture: Joi.string().max(255).required(),
});


export {
    getTailorValidation, registerTailorValidation, updateTailorValidation,
    uploadProfilePictureTailorValidation
};

