import * as weaponService from "../../src/api/v1/services/weaponService";
import * as repository from "../../src/api/v1/repositories/firestoreRepository";

jest.mock("../../src/api/v1/repositories/firestoreRepository", () => ({
    createDocument: jest.fn(),
    getDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));

describe("weaponService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createWeapon creates and returns weapon with generated weaponId", async () => {
        (repository.createDocument as jest.Mock).mockResolvedValue("weapon-1");
        const result = await weaponService.createWeapon({
            weaponId: "",
            weaponName: "Beam Rifle",
            type: "beam-rifle",
            damage: 120,
            range: 800,
            energyCost: 20,
            ammoCapacity: 10,
            weaponRarity: "common",
        });

        expect(repository.createDocument).toHaveBeenCalledWith("weapons", expect.objectContaining({ weaponName: "Beam Rifle" }));
        expect(result.weaponId).toBe("weapon-1");
    });

    test("getAllWeapons maps snapshot docs", async () => {
        (repository.getDocuments as jest.Mock).mockResolvedValue({
            docs: [
                { id: "weapon-1", data: () => ({ weaponName: "Beam Rifle" }) },
                { id: "weapon-2", data: () => ({ weaponName: "Beam Saber" }) },
            ],
        });

        const result = await weaponService.getAllWeapons();
        expect(result).toHaveLength(2);
        expect(result[0].weaponId).toBe("weapon-1");
        expect(result[1].weaponId).toBe("weapon-2");
    });

    test("getWeaponById throws when not found", async () => {
        (repository.getDocumentById as jest.Mock).mockResolvedValue(null);
        await expect(weaponService.getWeaponById("missing")).rejects.toThrow("Weapon with id missing not found.");
    });

    test("updateWeaponById returns merged data", async () => {
        (repository.updateDocument as jest.Mock).mockResolvedValue(undefined);
        const result = await weaponService.updateWeaponById("weapon-1", { damage: 200 });
        expect(repository.updateDocument).toHaveBeenCalledWith("weapons", "weapon-1", { damage: 200 });
        expect(result).toEqual({ id: "weapon-1", damage: 200 });
    });

    test("updateWeaponById throws mapped not found error on repository failure", async () => {
        (repository.updateDocument as jest.Mock).mockRejectedValue(new Error("firestore failed"));
        await expect(weaponService.updateWeaponById("weapon-1", { damage: 99 })).rejects.toThrow("Weapon with id weapon-1 not found.");
    });

    test("deleteWeaponById calls repository delete", async () => {
        (repository.deleteDocument as jest.Mock).mockResolvedValue(undefined);
        await weaponService.deleteWeaponById("weapon-1");
        expect(repository.deleteDocument).toHaveBeenCalledWith("weapons", "weapon-1");
    });
});
