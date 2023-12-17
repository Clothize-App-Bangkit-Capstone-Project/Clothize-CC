import { logger } from "../application/logging";
import customerService from "../service/customer-service";

const register = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const request = req.body;

        request.user_id = userId;
        logger.info(request);

        const result = await customerService.register(request);
        res.status(200).json({
            data: result,
            message: "Success"
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register
}