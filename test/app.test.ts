import request from "supertest";
import app from "../src/app";

describe("app", () => {
    test("GET / returns hello world", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Hello, World!");
    });

    test("GET /api/v1/health returns health data", async () => {
        const res = await request(app).get("/api/v1/health");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({
            status: "OK",
            version: "1.0.0",
        }));
    });
});
