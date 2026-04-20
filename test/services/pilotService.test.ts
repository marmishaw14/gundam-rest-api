import * as pilotService from "../../src/api/v1/services/pilotService";
import * as repository from "../../src/api/v1/repositories/firestoreRepository";

jest.mock("../../src/api/v1/repositories/firestoreRepository", () => ({
    createDocument: jest.fn(),
    getDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));

describe("pilotService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createPilot creates and returns pilot with generated id", async () => {
        (repository.createDocument as jest.Mock).mockResolvedValue("pilot-1");
        const result = await pilotService.createPilot({
            id: "",
            pilotName: "Amuro Ray",
            pilotRank: "advanced",
            pilotStatus: "active",
            assignedMobileSuitId: "ms-1",
            imageUrl: "https://example.com/amuro.jpg",
        });

        expect(repository.createDocument).toHaveBeenCalledWith("pilots", expect.objectContaining({ pilotName: "Amuro Ray" }));
        expect(result.id).toBe("pilot-1");
    });

    test("getAllPilots maps snapshot docs", async () => {
        (repository.getDocuments as jest.Mock).mockResolvedValue({
            docs: [
                { id: "pilot-1", data: () => ({ pilotName: "Amuro Ray" }) },
                { id: "pilot-2", data: () => ({ pilotName: "Char Aznable" }) },
            ],
        });

        const result = await pilotService.getAllPilots();
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe("pilot-1");
        expect(result[1].id).toBe("pilot-2");
    });

    test("getPilotById throws when not found", async () => {
        (repository.getDocumentById as jest.Mock).mockResolvedValue(null);
        await expect(pilotService.getPilotById("missing")).rejects.toThrow("Mission with id missing not found.");
    });

    test("updatePilotById returns merged data", async () => {
        (repository.updateDocument as jest.Mock).mockResolvedValue(undefined);
        const result = await pilotService.updatePilotById("pilot-1", { pilotStatus: "injured" });
        expect(repository.updateDocument).toHaveBeenCalledWith("pilots", "pilot-1", { pilotStatus: "injured" });
        expect(result).toEqual({ id: "pilot-1", pilotStatus: "injured" });
    });

    test("updatePilotById throws mapped not found error on repository failure", async () => {
        (repository.updateDocument as jest.Mock).mockRejectedValue(new Error("firestore failed"));
        await expect(pilotService.updatePilotById("pilot-1", { pilotStatus: "retired" })).rejects.toThrow("Pilot with id pilot-1 not found.");
    });

    test("deletePilotById calls repository delete", async () => {
        (repository.deleteDocument as jest.Mock).mockResolvedValue(undefined);
        await pilotService.deletePilotById("pilot-1");
        expect(repository.deleteDocument).toHaveBeenCalledWith("pilots", "pilot-1");
    });
});
