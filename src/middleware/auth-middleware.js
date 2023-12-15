import jwt from "jsonwebtoken";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

const authMiddleware = async (req, res, next) => {
    const header = req.get('Authorization');

    if (!header) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const token = header.split(" ").pop();

        const user = verifyAccessToken(token);

        if (!user) {
            throw new ResponseError(403, "Forbidden!");
        }

        logger.info(token);
        logger.info(user);
        req.user = user.data;

        next();
    }

}

const verifyAccessToken = (token) => {
    const secret = process.env.JWT_SECRET;

    try {
        const decoded = jwt.verify(token, secret);
        return {
            data: decoded
        }
    } catch (error) {
        return {
            errors: error.message
        }
    }
}

export {
    authMiddleware
};

