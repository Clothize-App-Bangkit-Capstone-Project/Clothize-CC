import supertest from "supertest";
import { app } from "../application/app";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";

describe("POST /api/users/register", () => {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    })

    it("should register a new user", async () => {
        const result = await supertest(app)
            .post('/api/users/register')
            .send({
                username: "test",
                password: "test",
                email: "test@gmail.com"
            });

        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.user_id).toBeDefined();
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.password).toBeUndefined();
        expect(result.body.data.email).toBe("test@gmail.com");
    })
})