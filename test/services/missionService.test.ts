import * as missionService from "../../src/api/v1/services/missionService";
import * as repository from "../../src/api/v1/repositories/firestoreRepository";

jest.mock("../../src/api/v1/repositories/firestoreRepository", () => ({
    createDocument: jest.fn(),
    getDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));

describe("missionService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createMission creates and returns mission with generated id", async () => {
        (repository.createDocument as jest.Mock).mockResolvedValue("mission-1");
        const result = await missionService.createMission({
            id: "",
            missionName: "Operation Silent Dusk",
            missionDescription: "Secure and hold perimeter",
            missionType: "defense",
            missionLocation: "Side 7",
            missionPriority: "high",
            missionStatus: "active",
            assignedAt: null,
            completedAt: null,
            mobileSuitIds: ["ms-1"],
            pilotIds: ["pilot-1"],
        });

        expect(repository.createDocument).toHaveBeenCalledWith("missions", expect.objectContaining({ missionName: "Operation Silent Dusk" }));
        expect(result.id).toBe("mission-1");
    });

    test("getAllMissions maps snapshot docs", async () => {
        (repository.getDocuments as jest.Mock).mockResolvedValue({
            docs: [
                { id: "mission-1", data: () => ({ missionName: "Operation A" }) },
                { id: "mission-2", data: () => ({ missionName: "Operation B" }) },
            ],
        });

        const result = await missionService.getAllMissions();
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe("mission-1");
        expect(result[1].id).toBe("mission-2");
    });

    test("getMissionById throws when not found", async () => {
        (repository.getDocumentById as jest.Mock).mockResolvedValue(null);
        await expect(missionService.getMissionById("missing")).rejects.toThrow("Mission with id missing not found.");
    });

    test("updateMissionById returns merged data", async () => {
        (repository.updateDocument as jest.Mock).mockResolvedValue(undefined);
        const result = await missionService.updateMissionById("mission-1", { missionStatus: "completed" });
        expect(repository.updateDocument).toHaveBeenCalledWith("missions", "mission-1", { missionStatus: "completed" });
        expect(result).toEqual({ id: "mission-1", missionStatus: "completed" });
    });

    test("updateMissionById throws mapped not found error on repository failure", async () => {
        (repository.updateDocument as jest.Mock).mockRejectedValue(new Error("firestore failed"));
        await expect(missionService.updateMissionById("mission-1", { missionStatus: "failed" })).rejects.toThrow("Mission with id mission-1 not found.");
    });

    test("deleteMissionById calls repository delete", async () => {
        (repository.deleteDocument as jest.Mock).mockResolvedValue(undefined);
        await missionService.deleteMissionById("mission-1");
        expect(repository.deleteDocument).toHaveBeenCalledWith("missions", "mission-1");
    });
});
