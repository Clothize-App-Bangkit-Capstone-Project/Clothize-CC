import express from "express";
import customerController from "../controller/customer-controller";
import measurementController from "../controller/measurement-controller";
import userController from "../controller/user-controller";
import { authMiddleware } from '../middleware/auth-middleware';

const userRouter = new express.Router();

userRouter.use(authMiddleware);

//USER API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);

//CUSTOMER API
userRouter.post('/api/customers/current', customerController.register)
userRouter.get('/api/customers/current', customerController.get)
userRouter.patch('/api/customers/current', customerController.update)
userRouter.post('/api/customers/upload', customerController.upload)

//MEASUREMENT API
userRouter.post('/api/measurements/current', measurementController.insert)
userRouter.get('/api/measurements/current', measurementController.getAll)
userRouter.post('/api/measurements/upload/:measurementId', measurementController.upload)

// //ORDER API
// userRouter.post('/api/orders/create', orderController.createOrder);
// userRouter.get('/api/orders/:username', orderController.getAllOrdersByClientUsername);
// userRouter.get('/api/orders/detail/:orderId', orderController.getOrderDetailByOrderId);

export {
    userRouter
};

