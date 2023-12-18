import { prismaClient } from "../application/database";
import { registerCustomerValidation } from "../validation/customer-validation";
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

export default {
    register
}