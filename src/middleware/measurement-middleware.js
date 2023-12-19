// measurement-controller.js
import { ResponseError } from "../error/response-error";
import measurementService from "../service/measurement-service";

const insertMeasurement = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await measurementService.insertMeasurement(request);

        res.status(200).json({
            status: result.status,
            message: result.message,
            measurement: result.measurement,
        });
    } catch (error) {
        next(error);
    }
};

const updateMeasurement = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await measurementService.updateMeasurement(request);

        res.status(200).json({
            status: result.status,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};

const deleteMeasurement = async (req, res, next) => {
    try {
        const username = req.params.username;

        const result = await measurementService.deleteMeasurement(username);

        res.status(200).json({
            status: result.status,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};

const getAllMeasurementsByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;

        const result = await measurementService.getAllMeasurementsByUsername(username);

        res.status(200).json({
            status: result.status,
            message: result.message,
            measurements: result.measurements,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    insertMeasurement,
    updateMeasurement,
    deleteMeasurement,
    getAllMeasurementsByUsername,
};
