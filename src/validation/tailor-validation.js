import Joi from "joi"

const registerTailorValidation = Joi.object({
    user_id: Joi.string().max(255).required(),
    store_name: Joi.string().max(100).required(),
    address: Joi.string().max(255).optional(),
    description: Joi.string().max(255).optional(),
    longtitude: Joi.number().optional(),
    latitude: Joi.number().optional(),
})

export {
    registerTailorValidation
}

