import { MobileSuit } from "../models/mobileSuitModel";
import { createDocument } from "../repositories/firestoreRepository";

const MOBILE_SUITS_COLLECTION = "mobile-suits";

export const createMobileSuit = async (mobileSuitData: MobileSuit): Promise<MobileSuit> => {

    const mobileSuit = {
        mobileSuitName: mobileSuitData.mobileSuitName,
        artilleryType: mobileSuitData.artilleryType,
        status: mobileSuitData.status,
        timeline: mobileSuitData.timeline,
        pilotId: mobileSuitData.pilotId,
        manufacturedAt: new Date()
    };

    const id = await createDocument<MobileSuit>(MOBILE_SUITS_COLLECTION, mobileSuit);
    return {id, ...mobileSuit};
};