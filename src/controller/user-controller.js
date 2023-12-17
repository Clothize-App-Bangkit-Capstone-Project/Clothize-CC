import { logger } from "../application/logging";
import userService from "../service/user-service";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.get(username)

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {

        const userId = req.user.user_id;
        const request = req.body;

        request.user_id = userId
        logger.info(request);

        const result = await userService.update(request);
        res.status(200).json({
            data: result,
            message: 'User updated successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login,
    get,
    update
}