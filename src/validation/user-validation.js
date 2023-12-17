import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required()
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();


const updateUserValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    username: Joi.string().max(100).optional(),
    password: Joi.string().max(100).optional(),
    email: Joi.string().email().max(100).optional(),
    isVerified: Joi.boolean().optional(),
    role: Joi.string().optional(),
})

export {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
};

