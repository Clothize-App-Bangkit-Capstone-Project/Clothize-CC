import { logger } from "../application/logging";
import tailorService from "../service/tailor-service";

const register = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const request = req.body;

        request.user_id = userId;
        logger.info(request)

        const result = await tailorService.register(request);
        res.status(200).json({
            message: result,
            status: true,
        })
    } catch (error) {
        next(error);
    }
}

export default {
    register
}