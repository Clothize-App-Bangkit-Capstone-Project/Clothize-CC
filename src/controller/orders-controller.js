import { logger } from "../application/logging";
import orderService from "../service/order-service";

const createOrder = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await orderService.createOrder(request);

        res.status(200).json({
            message: result.message,
            status: result.status,
        });
    } catch (error) {
        next(error);
    }
};

const getAllOrdersByClientUsername = async (req, res, next) => {
    try {
        const customerUsername = req.params.username;

        const result = await orderService.getAllOrderByClientUsername(customerUsername);

        res.status(200).json({
            message: result.message,
            status: result.status,
            orders: result.orders,
        });
    } catch (error) {
        next(error);
    }
};

const getOrderDetailByOrderId = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        const result = await orderService.getDetailOrderByOrderId(orderId);

        if (result.status) {
            res.status(200).json({
                message: result.message,
                status: result.status,
                order: result.order,
            });
        } else {
            res.status(404).json({
                message: result.message,
                status: result.status,
            });
        }
    } catch (error) {
        next(error);
    }
};

export default {
    createOrder,
    getAllOrdersByClientUsername,
    getOrderDetailByOrderId,
};
