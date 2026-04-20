import express from "express";
import request from "supertest";

jest.mock("../../src/api/v1/controllers/pilotController", () => ({
    createPilotHandler: (_req: any, res: any) => res.status(201).json({ status: "success" }),
    getAllPilotsHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    getPilotByIdHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    updatePilotByIdHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    deletePilotHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
}));

import pilotRoutes from "../../src/api/v1/routes/pilotRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1", pilotRoutes);

describe("pilotRoutes", () => {
    test("POST /api/v1/pilots validates request body", async () => {
        const res = await request(app).post("/api/v1/pilots").send({});
        expect(res.status).toBe(400);
    });

    test("GET /api/v1/pilots returns success", async () => {
        const res = await request(app).get("/api/v1/pilots");
        expect(res.status).toBe(200);
    });

    test("PUT /api/v1/pilots/:id validates params/body", async () => {
        const res = await request(app).put("/api/v1/pilots/pilot-1").send({ pilotStatus: "active" });
        expect(res.status).toBe(200);
    });
});
