import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation";
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
            username: userLogin.username,
        },
        select: {
            user_id: true,
            username: true,
            password: true,
            email: true
        }

    });

    if (!user) {
        throw new ResponseError(401, "Username or password are incorrect!")
    }

    const isPasswordCorrect = bcrypt.compareSync(userLogin.password, user.password);

    if (!isPasswordCorrect) {
        throw new ResponseError(401, "Username or password are incorrect!")
    }


    const data = {
        user_id: user.user_id,
        username: user.username,
        email: user.email
    }

    const activeToken = jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: '1h' })

    const response = {
        token: activeToken
    };

    return response;
}

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            isVerified: true,
            role: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "User is not found!");
    }

    return user;
}

export default {
    register,
    login,
    get
};

