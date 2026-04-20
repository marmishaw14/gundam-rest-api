import * as mobileSuitService from "../../src/api/v1/services/mobileSuitService";
import * as repository from "../../src/api/v1/repositories/firestoreRepository";

jest.mock("../../src/api/v1/repositories/firestoreRepository", () => ({
    createDocument: jest.fn(),
    getDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));

describe("mobileSuitService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createMobileSuit creates and returns mobile suit with generated id", async () => {
        (repository.createDocument as jest.Mock).mockResolvedValue("ms-1");
        const result = await mobileSuitService.createMobileSuit({
            id: "",
            mobileSuitName: "RX-78-2",
            artilleryType: "beam",
            status: "active",
            timeline: "Universal Century",
            pilotId: "pilot-1",
            manufacturedAt: new Date(),
        });

        expect(repository.createDocument).toHaveBeenCalledWith("mobile-suits", expect.objectContaining({ mobileSuitName: "RX-78-2" }));
        expect(result.id).toBe("ms-1");
    });

    test("getAllMobileSuits maps snapshot docs and normalizes manufacturedAt", async () => {
        const timestamp = { toDate: () => new Date("2026-01-01T00:00:00.000Z") };
        (repository.getDocuments as jest.Mock).mockResolvedValue({
            docs: [
                { id: "ms-1", data: () => ({ mobileSuitName: "A", manufacturedAt: timestamp }) },
                { id: "ms-2", data: () => ({ mobileSuitName: "B", manufacturedAt: new Date("2026-01-02T00:00:00.000Z") }) },
            ],
        });

        const result = await mobileSuitService.getAllMobileSuits();
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe("ms-1");
        expect(result[1].id).toBe("ms-2");
    });

    test("getMobileSuitById throws when not found", async () => {
        (repository.getDocumentById as jest.Mock).mockResolvedValue(null);
        await expect(mobileSuitService.getMobileSuitById("missing")).rejects.toThrow("Mobile suit with id missing not found.");
    });

    test("updateMobileSuitById returns merged data", async () => {
        (repository.updateDocument as jest.Mock).mockResolvedValue(undefined);
        const result = await mobileSuitService.updateMobileSuitById("ms-1", { status: "in-repair" as any });
        expect(repository.updateDocument).toHaveBeenCalledWith("mobile-suits", "ms-1", { status: "in-repair" });
        expect(result).toEqual({ id: "ms-1", status: "in-repair" });
    });

    test("updateMobileSuitById throws mapped not found error on repository failure", async () => {
        (repository.updateDocument as jest.Mock).mockRejectedValue(new Error("firestore failed"));
        await expect(mobileSuitService.updateMobileSuitById("ms-1", { status: "retired" as any })).rejects.toThrow("Mobile suit with id ms-1 not found.");
    });

    test("deleteMobileSuitById calls repository delete", async () => {
        (repository.deleteDocument as jest.Mock).mockResolvedValue(undefined);
        await mobileSuitService.deleteMobileSuitById("ms-1");
        expect(repository.deleteDocument).toHaveBeenCalledWith("mobile-suits", "ms-1");
    });
});
