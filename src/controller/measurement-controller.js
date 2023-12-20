import { Storage } from "@google-cloud/storage";
import { logger } from "../application/logging";
import { processFileMeasurementsMiddleware } from "../middleware/upload-measurements-middleware";
import measurementService from "../service/measurement-service";

const storage = new Storage({ keyFilename: "cloud-secret-keys.json" });
const bucket = storage.bucket("clothize-app")

const insert = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body

        const result = await measurementService.insert(user, request);

        res.status(200).json({
            message: result,
            status: true
        });
    } catch (error) {
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const result = await measurementService.getAll(userId);

        res.status(200).json({
            message: result,
            status: true
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const measurement_id = req.body.measurement_id

        logger.info(measurement_id)

        const result = await measurementService.get(measurement_id);

        res.status(200).json({
            message: result,
            status: true
        })
    } catch (error) {
        next(error)
    }
}

const upload = async (req, res, next) => {
    try {
        await processFileMeasurementsMiddleware(req, res);

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a file!",
                status: false
            })
        }
        const originalFileName = req.file.originalname;

        const fileName = originalFileName.replace(/ /g, "");

        const blob = bucket.file(fileName)
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        blobStream.on("error", (err) => {
            res.status(500).json({
                message: err.message,
                status: false
            })
        });

        blobStream.on("finish", async (data) => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            const userId = req.user.user_id
            const measurementId = parseInt(req.params.measurement_id)
            const request = {};

            request.measurement_id = measurementId;
            request.user_id = userId;
            request.picture = publicUrl;
            logger.info(request);

            const result = await measurementService.upload(request);

            res.status(200).json({
                message: result,
                status: true
            })
        })
        blobStream.end(req.file.buffer)

    } catch (error) {
        logger.info(error)

        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(500).json({
                message: "File size cannot be larger than 2MB!",
                status: false
            });
        }

        res.status(500).json({
            message: `Could not upload the file: ${req.file.originalname}. ${error}`,
            status: false
        })
    }
}

export default {
    insert,
    getAll,
    get,
    upload
}