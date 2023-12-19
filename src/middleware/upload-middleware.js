import multer from "multer";
import util from "util";

const maxFileSize = 2 * 1024 * 1024;

let processFile = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxFileSize }
}).single("profile_picture")

let processFileMiddleware = util.promisify(processFile);

export {
    processFileMiddleware
};

