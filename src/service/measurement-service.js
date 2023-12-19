import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/validation";

const insertMeasurement = async (request) => {
    const {
        clothingType,
        gender,
        height,
        weight,
        img,
        username,
    } = validate(insertMeasurementValidation, request);

    // Simpan data ke tabel measurement
    const measurement = await prismaClient.measurement.create({
        data: {
            clothing_type: clothingType,
            gender,
            height,
            weight,
            img,
            username,
            isSaving: false, // Default value
        },
    });

    // Kirim data ke model ML (gantilah dengan implementasi sesuai kebutuhan)
    // sendToMLModel(measurement);

    return {
        status: true,
        message: "Measurement inserted successfully!",
        measurement: {
            clothingType: measurement.clothing_type,
            gender: measurement.gender,
            modelResult: measurement.model_result,
            img: measurement.img,
        },
    };
};

const updateMeasurement = async (request) => {
    const {
        chestCircumference,
        bodyCircumference,
        bodyLength,
        shoulderWidth,
        username,
    } = validate(updateMeasurementValidation, request);

    // Update nilai isSaving menjadi true
    await prismaClient.measurement.updateMany({
        where: {
            username,
        },
        data: {
            isSaving: true,
            chest_circumference: chestCircumference,
            body_circumference: bodyCircumference,
            body_length: bodyLength,
            shoulder_width: shoulderWidth,
        },
    });

    return {
        status: true,
        message: "Measurement updated successfully!",
    };
};

const deleteMeasurement = async (username) => {
    // Hapus measurement yang isSavingnya false dan usernamenya sesuai dengan request
    await prismaClient.measurement.deleteMany({
        where: {
            username,
            isSaving: false,
        },
    });

    return {
        status: true,
        message: "Measurements deleted successfully!",
    };
};

const getAllMeasurementsByUsername = async (username) => {
    // Select statement untuk semua measurement sesuai dengan username dan isSaving true
    const measurements = await prismaClient.measurement.findMany({
        where: {
            username,
            isSaving: true,
        },
        select: {
            clothing_type: true,
            chest_circumference: true,
            body_circumference: true,
            body_length: true,
            shoulder_width: true,
            created_at: true,
        },
    });

    return {
        status: true,
        message: "Measurements retrieved successfully!",
        measurements,
    };
};

export default {
    insertMeasurement,
    updateMeasurement,
    deleteMeasurement,
    getAllMeasurementsByUsername,
};
