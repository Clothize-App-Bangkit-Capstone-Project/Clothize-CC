import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error"
import { getAllMeasurements, getSpesificMeasurements, insertMeasurementValidation, uploadPictureMeasurementsValidation } from "../validation/measurement-validation"
import { validate } from "../validation/validation"

const insert = async (user, request) => {
    const measurements = validate(insertMeasurementValidation, request)
    measurements.user_id = user.user_id

    return prismaClient.measurement.create({
        data: measurements,
        select: {
            measurement_id: true,
            clothing_size: true,
            picture: true,
            body_circumstances: true,
            shoulder_width: true,
            body_length: true,
            chest_circumstances: true,
            gender: true,
            height: true,
            weight: true,
            createdAt: true,
        }
    })
}

const getAll = async (userId) => {
    userId = validate(getAllMeasurements, userId);

    const measurements = await prismaClient.measurement.findMany({
        where: {
            user_id: userId,
        }
    })

    if (!measurements) {
        throw new ResponseError(404, "Measurements is not found!");
    }

    return [measurements]
}

const get = async (measurement_id) => {
    measurement_id = validate(getSpesificMeasurements, measurement_id);

    const measurements = await prismaClient.measurement.findUnique({
        where: {
            measurement_id: measurement_id
        }
    })

    return measurements
}

const upload = async (request) => {
    const measurement = validate(uploadPictureMeasurementsValidation, request);

    const data = {};
    if (measurement.picture) {
        data.picture = measurement.picture
    }

    return prismaClient.measurement.update({
        where: {
            user_id: measurement.user_id,
        },
        data: data,
        select: {
            measurement_id: true,
            picture: true
        }
    })
}

export default {
    insert,
    getAll,
    get,
    upload
}