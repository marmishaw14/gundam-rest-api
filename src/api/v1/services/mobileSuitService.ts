import { MobileSuit } from "../models/mobileSuitModel";
import { createDocument, getDocuments } from "../repositories/firestoreRepository";

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

export const getAllMobileSuits = async (): Promise<MobileSuit[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(MOBILE_SUITS_COLLECTION);

    return snapshot.docs.map((doc) => {
        const mobileSuitData = doc.data();
        return {
            id: doc.id,
            ...mobileSuitData,
            manufacturedAt: mobileSuitData.manufacturedAt?.toDate?.() ?? mobileSuitData.manufacturedAt ?? new Date(),
        } as MobileSuit;
    });
};
