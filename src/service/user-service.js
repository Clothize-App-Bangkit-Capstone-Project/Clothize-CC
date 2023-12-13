import bcrypt from "bcrypt";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { loginUserValidation, registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists!")
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            user_id: true,
            username: true,
            email: true
        }
    });
}

const login = async (request) => {
    const userLogin = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: userLogin.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password are incorrect!")
    }

    const isPasswordCorrect = bcrypt.compareSync(userLogin.password, user.password);

    if (!isPasswordCorrect) {
        throw new ResponseError(401, "Username or password are incorrect!")
    }
}

export default {
    register
};

