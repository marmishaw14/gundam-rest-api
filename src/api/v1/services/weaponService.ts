import { Weapon } from "../models/weaponModel";
import { createDocument } from "../repositories/firestoreRepository";

const WEAPONS_COLLECTION = "weapons";

export const createWeapon = async (weaponData: Weapon): Promise<Weapon> => {

    const weapon = {
        weaponName: weaponData.weaponName,
        type: weaponData.type,
        damage: weaponData.damage,
        range: weaponData.range,
        energyCost: weaponData.energyCost,
        ammoCapacity: weaponData.ammoCapacity,
        weaponRarity: weaponData.weaponRarity
    };

    const weaponId = await createDocument<Weapon>(WEAPONS_COLLECTION, weapon);
    return {weaponId, ...weapon};
};