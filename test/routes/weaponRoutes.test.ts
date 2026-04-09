import express from "express";
import request from "supertest";

jest.mock("../../src/api/v1/controllers/weaponController", () => ({
    createWeaponHandler: (_req: any, res: any) => res.status(201).json({ status: "success" }),
    getAllWeaponsHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    getWeaponByIdHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    updateWeaponHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
    deleteWeaponHandler: (_req: any, res: any) => res.status(200).json({ status: "success" }),
}));

import weaponRoutes from "../../src/api/v1/routes/weaponRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1", weaponRoutes);

describe("weaponRoutes", () => {
    test("POST /api/v1/weapons validates request body", async () => {
        const res = await request(app).post("/api/v1/weapons").send({});
        expect(res.status).toBe(400);
    });

    test("GET /api/v1/weapons returns success", async () => {
        const res = await request(app).get("/api/v1/weapons");
        expect(res.status).toBe(200);
    });

    test("DELETE /api/v1/weapons/:id returns success", async () => {
        const res = await request(app).delete("/api/v1/weapons/weapon-1");
        expect(res.status).toBe(200);
    });
});
