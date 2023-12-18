import { Storage } from "@google-cloud/storage";
import { logger } from "../application/logging";
import { processFileMiddleware } from "../middleware/upload-middleware";
import customerService from "../service/customer-service";

const storage = new Storage({ keyFilename: "cloud-secret-keys.json" })
const bucket = storage.bucket("clothize-app");

const register = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const request = req.body;

        request.user_id = userId;
        logger.info(request);

        const result = await customerService.register(request);
        res.status(200).json({
            message: result,
            status: true
        });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const userId = req.user.user_id;

        const result = await customerService.get(userId);

        res.status(200).json({
            message: result,
            status: true
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const request = req.body;

        request.user_id = userId;
        logger.info(request);

        const result = await customerService.update(request);

        res.status(200).json({
            message: result,
            status: true
        })
    } catch (error) {
        next(error);
    }
}

const upload = async (req, res, next) => {
    try {
        await processFileMiddleware(req, res);

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
            const request = {};

            request.user_id = userId;
            request.profile_picture = publicUrl;
            logger.info(request);

            const result = await customerService.upload(request);

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
    register,
    get,
    update,
    upload
}