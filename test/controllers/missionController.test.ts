import * as missionController from "../../src/api/v1/controllers/missionController";
import * as missionService from "../../src/api/v1/services/missionService";
import { HTTP_STATUS } from "../../src/constants/httpConstants";
import { createMockRequest, createMockResponse, createNext } from "../helpers/httpMocks";

jest.mock("../../src/api/v1/services/missionService", () => ({
    createMission: jest.fn(),
    getAllMissions: jest.fn(),
    getMissionById: jest.fn(),
    updateMissionById: jest.fn(),
    deleteMissionById: jest.fn(),
}));

describe("missionController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createMissionHandler returns 201 on success", async () => {
        const created = { id: "m-1", missionName: "Operation Silent Dusk" };
        (missionService.createMission as jest.Mock).mockResolvedValue(created);
        const req = createMockRequest({ body: { missionName: "Operation Silent Dusk" } });
        const res = createMockResponse();
        const next = createNext();

        await missionController.createMissionHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: created }));
        expect(next).not.toHaveBeenCalled();
    });

    test("getAllMissionsHandler returns 200 on success", async () => {
        const missions = [{ id: "m-1" }];
        (missionService.getAllMissions as jest.Mock).mockResolvedValue(missions);
        const req = createMockRequest();
        const res = createMockResponse();
        const next = createNext();

        await missionController.getAllMissionsHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: missions }));
        expect(next).not.toHaveBeenCalled();
    });

    test("getMissionByIdHandler returns 200 on success", async () => {
        const mission = { id: "m-1" };
        (missionService.getMissionById as jest.Mock).mockResolvedValue(mission);
        const req = createMockRequest({ params: { id: "m-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await missionController.getMissionByIdHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: mission }));
        expect(next).not.toHaveBeenCalled();
    });

    test("updateMissionHandler returns 200 on success", async () => {
        const updated = { id: "m-1", missionStatus: "completed" };
        (missionService.updateMissionById as jest.Mock).mockResolvedValue(updated);
        const req = createMockRequest({ params: { id: "m-1" } as any, body: { missionStatus: "completed" } });
        const res = createMockResponse();
        const next = createNext();

        await missionController.updateMissionHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: updated }));
        expect(next).not.toHaveBeenCalled();
    });

    test("deleteMissionHandler returns 200 on success", async () => {
        (missionService.deleteMissionById as jest.Mock).mockResolvedValue(undefined);
        const req = createMockRequest({ params: { id: "m-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await missionController.deleteMissionHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: {} }));
        expect(next).not.toHaveBeenCalled();
    });

    test("updateMissionHandler forwards errors", async () => {
        const err = new Error("update failed");
        (missionService.updateMissionById as jest.Mock).mockRejectedValue(err);
        const req = createMockRequest({ params: { id: "m-1" } as any, body: {} });
        const res = createMockResponse();
        const next = createNext();

        await missionController.updateMissionHandler(req, res, next);
        expect(next).toHaveBeenCalledWith(err);
    });
});
