import express from "express";
import request from "supertest";

jest.mock("../../src/api/v1/controllers/missionController", () => ({
    createMissionHandler: (_req: any, res: any) => res.status(201).json({ status: "success" }),
    getAllMissionsHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    getMissionByIdHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    updateMissionHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    deleteMissionHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
}));

import missionRoutes from "../../src/api/v1/routes/missionRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1", missionRoutes);

describe("missionRoutes", () => {
    test("POST /api/v1/missions validates request body", async () => {
        const res = await request(app).post("/api/v1/missions").send({});
        expect(res.status).toBe(400);
    });

    test("GET /api/v1/missions returns success", async () => {
        const res = await request(app).get("/api/v1/missions");
        expect(res.status).toBe(200);
    });

    test("GET /api/v1/missions/:id returns success", async () => {
        const res = await request(app).get("/api/v1/missions/mission-1");
        expect(res.status).toBe(200);
    });
});
