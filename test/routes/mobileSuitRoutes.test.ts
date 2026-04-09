import express from "express";
import request from "supertest";

jest.mock("../../src/api/v1/controllers/mobileSuitController", () => ({
    createMobileSuitHandler: (_req: any, res: any) => res.status(201).json({ status: "success" }),
    getAllMobileSuitsHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    getMobileSuitByIdHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    updateMobileSuitHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    deleteMobileSuitHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
}));

import mobileSuitRoutes from "../../src/api/v1/routes/mobileSuitRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1", mobileSuitRoutes);

describe("mobileSuitRoutes", () => {
    test("POST /api/v1/mobile-suits validates request body", async () => {
        const res = await request(app).post("/api/v1/mobile-suits").send({});
        expect(res.status).toBe(400);
    });

    test("GET /api/v1/mobile-suits returns success", async () => {
        const res = await request(app).get("/api/v1/mobile-suits");
        expect(res.status).toBe(200);
    });

    test("PUT /api/v1/mobile-suits/:id validates params/body", async () => {
        const res = await request(app).put("/api/v1/mobile-suits/abc").send({ mobileSuitName: "RX-78-2" });
        expect(res.status).toBe(200);
    });
});
