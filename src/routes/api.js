import express from "express";
import customerController from "../controller/customer-controller";
import userController from "../controller/user-controller";
import { authMiddleware } from '../middleware/auth-middleware';

const userRouter = new express.Router();

userRouter.use(authMiddleware);

//USER API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);

//CUSTOMER API
userRouter.post('/api/customers/current', customerController.register)

export {
    userRouter
};

