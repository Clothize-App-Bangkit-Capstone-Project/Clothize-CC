import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { getCustomerValidation, registerCustomerValidation, updateCustomerValidation, uploadProfilePictCustomerValidation } from "../validation/customer-validation";
import { validate } from "../validation/validation";


const register = async (request) => {
    const customer = validate(registerCustomerValidation, request);

    const countCustomer = await prismaClient.customer.count({
        where: {
            user_id: customer.user_id
        }
    });

    if (countCustomer === 1) {
        throw new ResponseError(400, "Customer already exists!")
    }

    return prismaClient.customer.create({
        data: customer,
    })
}

const get = async (userId) => {
    userId = validate(getCustomerValidation, userId);

    const customer = await prismaClient.customer.findUnique({
        where: {
            user_id: userId
        },
        select: {
            customer_id: true,
            full_name: true,
            address: true,
            phone_number: true,
            profile_picture: true,
            user_id: true
        }
    })

    if (!customer) {
        throw new ResponseError(404, "Customer is not found!");
    }

    return customer;
}

const update = async (request) => {
    const customerLogin = validate(updateCustomerValidation, request);

    const customer = await prismaClient.customer.findUnique({
        where: {
            user_id: customerLogin.user_id
        },
        select: {
            customer_id: true,
            full_name: true,
            address: true,
            phone_number: true,
            user_id: true
        }
    })

    if (!customer) {
        throw new ResponseError(404, "Customer is not found");
    }

    const data = {};
    data.customer_id = customer.customer_id
    data.user_id = customer.user_id

    if (customerLogin.full_name) {
        data.full_name = customerLogin.full_name
    }
    if (customerLogin.address) {
        data.address = customerLogin.address
    }
    if (customerLogin.phone_number) {
        data.phone_number = customerLogin.phone_number
    }

    return prismaClient.customer.update({
        where: {
            customer_id: data.customer_id
        },
        data: data,
        select: {
            customer_id: true,
            full_name: true,
            address: true,
            phone_number: true,
            user_id: true
        }
    })
}

const upload = async (request) => {
    const customer = validate(uploadProfilePictCustomerValidation, request);

    const isCustomerExist = await prismaClient.customer.findUnique({
        where: {
            user_id: customer.user_id
        },
        select: {
            customer_id: true,
            profile_picture: true,
        }
    });

    if (!isCustomerExist) {
        throw new ResponseError(404, "Customer not found!")
    }

    const data = {};
    if (customer.profile_picture) {
        data.profile_picture = customer.profile_picture
    }

    return prismaClient.customer.update({
        where: {
            user_id: customer.user_id,
        },
        data: data,
        select: {
            customer_id: true,
            profile_picture: true
        }
    })
}

export default {
    register,
    get,
    update,
    upload,
}