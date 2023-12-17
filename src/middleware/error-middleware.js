import { ResponseError } from "../error/response-error";

const errorMiddleware = async (error, req, res, next) => {
    if (!error) {
        next();
        return;
    }

    if (error instanceof ResponseError) {
        res.status(error.status).json({
            message: error.message,
            status: false
        }).end();
    } else {
        res.status(500).json({
            message: error.message,
            status: false
        }).end();
    }
}

export {
    errorMiddleware
};

