import express from "express";
import customerController from "../controller/customer-controller";
import userController from "../controller/user-controller";
import { authMiddleware } from '../middleware/auth-middleware';
import tailorController from "../controller/tailor-controller";

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

//TAILOR API
userRouter.post('/api/tailors/current', tailorController.register)
userRouter.get('/api/tailors/current', tailorController.get)
userRouter.patch('/api/tailors/current', tailorController.update)
userRouter.post('/api/tailors/upload', tailorController.upload)




export {
    userRouter
};


