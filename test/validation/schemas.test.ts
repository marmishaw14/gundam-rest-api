import { mobileSuitSchemas } from "../../src/api/v1/validation/mobileSuitSchemas";
import { weaponSchemas } from "../../src/api/v1/validation/weaponSchemas";
import { missionSchemas } from "../../src/api/v1/validation/missionSchemas";

describe("validation schemas", () => {
    test("mobileSuit create accepts valid payload", () => {
        const { error } = mobileSuitSchemas.create.body.validate({
            mobileSuitName: "RX-78-2",
            artilleryType: "beam",
            status: "active",
            timeline: "Universal Century",
            pilotId: "pilot-1",
        });
        expect(error).toBeUndefined();
    });

    test("mobileSuit getById rejects empty id", () => {
        const { error } = mobileSuitSchemas.getById.params.validate({ id: "" });
        expect(error).toBeDefined();
    });

    test("weapon create accepts valid payload", () => {
        const { error } = weaponSchemas.create.body.validate({
            weaponName: "Beam Rifle",
            type: "beam-rifle",
            damage: 120,
            range: 800,
            energyCost: 20,
            ammoCapacity: 10,
            weaponRarity: "common",
        });
        expect(error).toBeUndefined();
    });

    test("weapon update rejects invalid type", () => {
        const { error } = weaponSchemas.update.body.validate({ type: "banana" });
        expect(error).toBeDefined();
    });

    test("mission create accepts valid payload with ISO dates", () => {
        const { error } = missionSchemas.create.body.validate({
            missionName: "Operation Silent Dusk",
            missionDescription: "Secure target perimeter",
            missionType: "defense",
            missionLocation: "Side 7",
            missionPriority: "high",
            missionStatus: "active",
            assignedAt: "2026-04-05T10:00:00.000Z",
            completedAt: null,
            mobileSuitIds: ["ms-1"],
            pilotIds: ["pilot-1"],
        });
        expect(error).toBeUndefined();
    });

    test("mission create rejects non-ISO date", () => {
        const { error } = missionSchemas.create.body.validate({
            missionName: "Operation Silent Dusk",
            missionDescription: "Secure target perimeter",
            missionType: "defense",
            missionLocation: "Side 7",
            assignedAt: "04/05/2026",
        });
        expect(error).toBeDefined();
    });
});
