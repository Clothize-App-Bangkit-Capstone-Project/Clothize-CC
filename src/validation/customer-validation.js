import Joi from "joi";

const registerCustomerValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    full_name: Joi.string().max(100).optional(),
    address: Joi.string().max(255).optional(),
    phone_number: Joi.string().max(20).optional(),
});

const getCustomerValidation = Joi.string().max(255).required();

const updateCustomerValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    full_name: Joi.string().max(100).optional(),
    address: Joi.string().max(255).optional(),
    phone_number: Joi.string().max(20).optional(),
});

const uploadProfilePictCustomerValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    profile_picture: Joi.string().max(255).required(),
});


export {
    getCustomerValidation, registerCustomerValidation, updateCustomerValidation,
    uploadProfilePictCustomerValidation
};

