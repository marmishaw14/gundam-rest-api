import { Weapon } from "../models/weaponModel";
import { createDocument, getDocuments, getDocumentById, updateDocument } from "../repositories/firestoreRepository";

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

export const getAllWeapons = async (): Promise<Weapon[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(WEAPONS_COLLECTION);

    return snapshot.docs.map((doc) => {
        const weaponsData = doc.data();
        return {
            weaponId: doc.id,
            ...weaponsData
        } as Weapon;
    });
};

export const getWeaponById = async (id: string): Promise<Weapon> => {
    const doc: FirebaseFirestore.DocumentSnapshot | null = await getDocumentById(WEAPONS_COLLECTION, id);

    if (!doc) {
        throw new Error(`Weapon with id ${id} not found.`)
    }

    return doc.data() as Weapon;
};

export const updateWeaponById = async (id: string, weaponData: Partial<Weapon>): Promise<Weapon> => {
    try {
        await updateDocument(WEAPONS_COLLECTION, id, weaponData);

        return { id, ...weaponData } as Weapon;
    } catch (error) {
        throw new Error(`Weapon with id ${id} not found.`)
    }
};