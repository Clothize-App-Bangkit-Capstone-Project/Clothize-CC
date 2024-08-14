import supertest from "supertest";
import { app } from "../application/app";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";

describe("POST /api/users/register", () => {

    afterAll(async () => {
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

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message.user_id).toBeDefined();
        expect(result.body.message.username).toBe("test")
        expect(result.body.message.email).toBe("test@gmail.com");
    })

    it("should throw error if username already exists", async () => {
        const result = await supertest(app)
            .post('/api/users/register')
            .send({
                username: "test",
                password: "test",
                email: "test@gmail.com"
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.message.username).not.toBe("test")
    })

    it("should throw error if email already exists", async () => {
        const result = await supertest(app)
            .post('/api/users/register')
            .send({
                username: "test",
                password: "test",
                email: "test@gmail.com"
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.message.email).not.toBe("test@gmail.com")
    })

    it("should throw error if either username, password or email is empty", async () => {
        const result = await supertest(app)
            .post('/api/users/register')
            .send({
                username: "",
                password: "test",
                email: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.message.username).not.toBeDefined()
        expect(result.body.message.email).not.toBeDefined()
    })
})

describe("POST /api/users/login", () => {

    afterAll(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    })

    it("should login with correct credentials", async () => {
        await supertest(app)
            .post('/api/users/register')
            .send({
                username: "test",
                password: "test",
                email: "test@gmail.com"
            });

        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "test@gmail.com",
                password: "test",
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message.token).toBeDefined();
        expect(result.body.message.email).toBe("test@gmail.com");
    })

    it('should throw error if credentials are incorrect', async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "test1@gmail.com",
                password: "test1",
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.message.email).not.toBe("test@gmail.com");
        expect(result.body.message.password).not.toBe("test");
    })
})

describe("GET /api/users/current", () => {
    let token = ''

    beforeAll(async () => {
        await supertest(app)
            .post('/api/users/register')
            .send({
                username: "test",
                password: "test",
                email: "test@gmail.com"
            });

        const response = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "test@gmail.com",
                password: "test",
            });

        token = response.body.message.token
    })

    afterAll(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    })

    it("should return user details if user is authenticated", async () => {
        const result = await supertest(app)
            .get('/api/users/current')
            .set('Authorization', `Bearer ${token}`);


        expect(result.status).toBe(200)
    })

    it("should throw error if user is Unauthorized", async () => {
        const result = await supertest(app)
            .get('/api/users/current')
            .set('Authorization', ``);


        expect(result.status).toBe(401)
    })

    it("should throw error if user is Forbidden", async () => {
        const result = await supertest(app)
            .get('/api/users/current')
            .set('Authorization', `Bearer `);


        expect(result.status).toBe(403)
    })

})
