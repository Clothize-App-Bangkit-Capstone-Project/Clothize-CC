import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { getTailorValidation, registerTailorValidation, updateTailorValidation, uploadProfilePictureTailorValidation } from "../validation/tailor-validation";
import { validate } from "../validation/validation";

const register = async (request) => {
    const tailor = validate(registerTailorValidation, request);

    const countTailor = await prismaClient.tailor.count({
        where: {
            user_id: tailor.user_id
        }
    });

    if (countTailor === 1) {
        throw new ResponseError(400, " Tailor already exists!")
    }

    return prismaClient.tailor.create({
        data: tailor,
    })
}

const get = async (userId) => {
    userId = validate(getTailorValidation, userId);

    const customer = await prismaClient.tailor.findUnique({
        where: {
            user_id: userId
        },
        select: {
            tailor_id: true,
            name: true,
            address: true,
            phone_number: true,
            profile_picture: true,
            description: true,
            user_id: true
        }
    })

    if (!tailor) {
        throw new ResponseError(404, "Tailor is not found!");
    }

    return tailor;
}

const update = async (request) => {
    const tailorLogin = validate(updateTailorValidation, request);

    const tailor = await prismaClient.tailor.findUnique({
        where: {
            user_id: tailorLogin.user_id
        },
        select: {
            tailor_id: true,
            name: true,
            address: true,
            phone_number: true,
            description: true,
            user_id: true
        }
    })

    if (!tailor) {
        throw new ResponseError(404, "Tailor is not found");
    }

    const data = {};
    data.tailor_id = tailor.tailor_id
    data.user_id = tailor.user_id

    if (tailorLogin.name) {
        data.name = tailorLogin.name
    }
    if (tailorLogin.address) {
        data.address = tailorLogin.address
    }
    if (tailorLogin.phone_number) {
        data.phone_number = tailorLogin.phone_number
    }

    return prismaClient.tailor.update({
        where: {
            tailor_id: data.tailor_id
        },
        data: data,
        select: {
            tailor_id: true,
            name: true,
            address: true,
            phone_number: true,
            user_id: true
        }
    })
}

const upload = async (request) => {
    const tailor = validate(uploadProfilePictureTailorValidation, request);

    const isTailorExist = await prismaClient.tailor.findUnique({
        where: {
            user_id: tailor.user_id
        },
        select: {
            tailor_id: true,
            profile_picture: true,
        }
    });

    if (!isTailorExist) {
        throw new ResponseError(404, "Tailor not found!")
    }

    const data = {};
    if (tailor.profile_picture) {
        data.profile_picture = tailor.profile_picture
    }

    return prismaClient.tailor.update({
        where: {
            user_id: tailor.user_id,
        },
        data: data,
        select: {
            tailor_id: true,
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