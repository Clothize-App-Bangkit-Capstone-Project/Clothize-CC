import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error"
import { registerTailorValidation } from "../validation/tailor-validation"

const register = async (request) => {
    const tailor = validate(registerTailorValidation, request)

    const countTailor = await prismaClient.tailor.count({
        where: {
            user_id: tailor.user_id
        }
    })

    if (countTailor === 1) {
        throw new ResponseError(400, "Tailor already exist!");
    }

    await prismaClient.user.update({
        where: {
            user_id: tailor.user_id
        },
        data: {
            role: 'tailor'
        }
    })

    return prismaClient.tailor.create({
        data: tailor
    })

}

export default {
    register
}