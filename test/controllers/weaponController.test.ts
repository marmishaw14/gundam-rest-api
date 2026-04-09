import * as weaponController from "../../src/api/v1/controllers/weaponController";
import * as weaponService from "../../src/api/v1/services/weaponService";
import { HTTP_STATUS } from "../../src/constants/httpConstants";
import { createMockRequest, createMockResponse, createNext } from "../helpers/httpMocks";

jest.mock("../../src/api/v1/services/weaponService", () => ({
    createWeapon: jest.fn(),
    getAllWeapons: jest.fn(),
    getWeaponById: jest.fn(),
    updateWeaponById: jest.fn(),
    deleteWeaponById: jest.fn(),
}));

describe("weaponController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createWeaponHandler returns 201 on success", async () => {
        const created = { weaponId: "w-1", weaponName: "Beam Rifle" };
        (weaponService.createWeapon as jest.Mock).mockResolvedValue(created);
        const req = createMockRequest({ body: { weaponName: "Beam Rifle" } });
        const res = createMockResponse();
        const next = createNext();

        await weaponController.createWeaponHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: created }));
        expect(next).not.toHaveBeenCalled();
    });

    test("getAllWeaponsHandler returns 200 on success", async () => {
        const weapons = [{ weaponId: "w-1" }];
        (weaponService.getAllWeapons as jest.Mock).mockResolvedValue(weapons);
        const req = createMockRequest();
        const res = createMockResponse();
        const next = createNext();

        await weaponController.getAllWeaponsHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: weapons }));
        expect(next).not.toHaveBeenCalled();
    });

    test("getWeaponByIdHandler returns 200 on success", async () => {
        const weapon = { weaponId: "w-1" };
        (weaponService.getWeaponById as jest.Mock).mockResolvedValue(weapon);
        const req = createMockRequest({ params: { id: "w-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await weaponController.getWeaponByIdHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: weapon }));
        expect(next).not.toHaveBeenCalled();
    });

    test("updateWeaponHandler returns 200 on success", async () => {
        const updated = { id: "w-1", damage: 200 };
        (weaponService.updateWeaponById as jest.Mock).mockResolvedValue(updated);
        const req = createMockRequest({ params: { id: "w-1" } as any, body: { damage: 200 } });
        const res = createMockResponse();
        const next = createNext();

        await weaponController.updateWeaponHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: updated }));
        expect(next).not.toHaveBeenCalled();
    });

    test("deleteWeaponHandler returns 200 on success", async () => {
        (weaponService.deleteWeaponById as jest.Mock).mockResolvedValue(undefined);
        const req = createMockRequest({ params: { id: "w-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await weaponController.deleteWeaponHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: {} }));
        expect(next).not.toHaveBeenCalled();
    });

    test("deleteWeaponHandler forwards errors", async () => {
        const err = new Error("delete failed");
        (weaponService.deleteWeaponById as jest.Mock).mockRejectedValue(err);
        const req = createMockRequest({ params: { id: "w-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await weaponController.deleteWeaponHandler(req, res, next);
        expect(next).toHaveBeenCalledWith(err);
    });
});
