import * as pilotController from "../../src/api/v1/controllers/pilotController";
import * as pilotService from "../../src/api/v1/services/pilotService";
import { HTTP_STATUS } from "../../src/constants/httpConstants";
import { createMockRequest, createMockResponse, createNext } from "../helpers/httpMocks";

jest.mock("../../src/api/v1/services/pilotService", () => ({
    createPilot: jest.fn(),
    getAllPilots: jest.fn(),
    getPilotById: jest.fn(),
    updatePilotById: jest.fn(),
    deletePilotById: jest.fn(),
}));

describe("pilotController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createPilotHandler returns 201 on success", async () => {
        const created = { id: "pilot-1", pilotName: "Amuro Ray" };
        (pilotService.createPilot as jest.Mock).mockResolvedValue(created);
        const req = createMockRequest({ body: { pilotName: "Amuro Ray" } });
        const res = createMockResponse();
        const next = createNext();

        await pilotController.createPilotHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: created }));
        expect(next).not.toHaveBeenCalled();
    });

    test("getAllPilotsHandler returns 200 on success", async () => {
        const pilots = [{ id: "pilot-1" }];
        (pilotService.getAllPilots as jest.Mock).mockResolvedValue(pilots);
        const req = createMockRequest();
        const res = createMockResponse();
        const next = createNext();

        await pilotController.getAllPilotsHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: pilots }));
        expect(next).not.toHaveBeenCalled();
    });

    test("getPilotByIdHandler returns 200 on success", async () => {
        const pilot = { id: "pilot-1" };
        (pilotService.getPilotById as jest.Mock).mockResolvedValue(pilot);
        const req = createMockRequest({ params: { id: "pilot-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await pilotController.getPilotByIdHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: pilot }));
        expect(next).not.toHaveBeenCalled();
    });

    test("updatePilotByIdHandler returns 200 on success", async () => {
        const updated = { id: "pilot-1", pilotStatus: "injured" };
        (pilotService.updatePilotById as jest.Mock).mockResolvedValue(updated);
        const req = createMockRequest({ params: { id: "pilot-1" } as any, body: { pilotStatus: "injured" } });
        const res = createMockResponse();
        const next = createNext();

        await pilotController.updatePilotByIdHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: updated }));
        expect(next).not.toHaveBeenCalled();
    });

    test("deletePilotHandler returns 200 on success", async () => {
        (pilotService.deletePilotById as jest.Mock).mockResolvedValue(undefined);
        const req = createMockRequest({ params: { id: "pilot-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await pilotController.deletePilotHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: {} }));
        expect(next).not.toHaveBeenCalled();
    });

    test("updatePilotByIdHandler forwards errors", async () => {
        const err = new Error("update failed");
        (pilotService.updatePilotById as jest.Mock).mockRejectedValue(err);
        const req = createMockRequest({ params: { id: "pilot-1" } as any, body: {} });
        const res = createMockResponse();
        const next = createNext();

        await pilotController.updatePilotByIdHandler(req, res, next);
        expect(next).toHaveBeenCalledWith(err);
    });
});
