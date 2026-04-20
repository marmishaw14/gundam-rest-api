import * as mobileSuitController from "../../src/api/v1/controllers/mobileSuitController";
import * as mobileSuitService from "../../src/api/v1/services/mobileSuitService";
import { HTTP_STATUS } from "../../src/constants/httpConstants";
import { createMockRequest, createMockResponse, createNext } from "../helpers/httpMocks";

jest.mock("../../src/api/v1/services/mobileSuitService", () => ({
    createMobileSuit: jest.fn(),
    getAllMobileSuits: jest.fn(),
    getMobileSuitById: jest.fn(),
    updateMobileSuitById: jest.fn(),
    deleteMobileSuitById: jest.fn(),
}));

describe("mobileSuitController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createMobileSuitHandler returns 201 on success", async () => {
        const created = { id: "ms-1", mobileSuitName: "RX-78-2" };
        (mobileSuitService.createMobileSuit as jest.Mock).mockResolvedValue(created);
        const req = createMockRequest({ body: { mobileSuitName: "RX-78-2" } });
        const res = createMockResponse();
        const next = createNext();

        await mobileSuitController.createMobileSuitHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: created }));
        expect(next).not.toHaveBeenCalled();
    });

    test("createMobileSuitHandler forwards errors", async () => {
        const err = new Error("create failed");
        (mobileSuitService.createMobileSuit as jest.Mock).mockRejectedValue(err);
        const req = createMockRequest();
        const res = createMockResponse();
        const next = createNext();

        await mobileSuitController.createMobileSuitHandler(req, res, next);
        expect(next).toHaveBeenCalledWith(err);
    });

    test("getAllMobileSuitsHandler returns 200 on success", async () => {
        const mobileSuits = [{ id: "ms-1" }];
        (mobileSuitService.getAllMobileSuits as jest.Mock).mockResolvedValue(mobileSuits);
        const req = createMockRequest();
        const res = createMockResponse();
        const next = createNext();

        await mobileSuitController.getAllMobileSuitsHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: mobileSuits }));
        expect(next).not.toHaveBeenCalled();
    });

    test("getMobileSuitByIdHandler returns 200 on success", async () => {
        const mobileSuit = { id: "ms-1" };
        (mobileSuitService.getMobileSuitById as jest.Mock).mockResolvedValue(mobileSuit);
        const req = createMockRequest({ params: { id: "ms-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await mobileSuitController.getMobileSuitByIdHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: mobileSuit }));
        expect(next).not.toHaveBeenCalled();
    });

    test("updateMobileSuitHandler returns 200 on success", async () => {
        const updated = { id: "ms-1", status: "active" };
        (mobileSuitService.updateMobileSuitById as jest.Mock).mockResolvedValue(updated);
        const req = createMockRequest({ params: { id: "ms-1" } as any, body: { status: "active" } });
        const res = createMockResponse();
        const next = createNext();

        await mobileSuitController.updateMobileSuitHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: updated }));
        expect(next).not.toHaveBeenCalled();
    });

    test("deleteMobileSuitHandler returns 200 on success", async () => {
        (mobileSuitService.deleteMobileSuitById as jest.Mock).mockResolvedValue(undefined);
        const req = createMockRequest({ params: { id: "ms-1" } as any });
        const res = createMockResponse();
        const next = createNext();

        await mobileSuitController.deleteMobileSuitHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "success", data: {} }));
        expect(next).not.toHaveBeenCalled();
    });
});
