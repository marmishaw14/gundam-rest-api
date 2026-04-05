import { MobileSuit } from "../models/mobileSuitModel";
import { createDocument, deleteDocument, getDocumentById, getDocuments, updateDocument } from "../repositories/firestoreRepository";

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

export const getMobileSuitById = async (id: string): Promise<MobileSuit> => {
    const doc: FirebaseFirestore.DocumentSnapshot | null = await getDocumentById(MOBILE_SUITS_COLLECTION, id);

    if (!doc) {
        throw new Error(`Mobile suit with id ${id} not found.`);
    }

    return doc.data() as MobileSuit;
};

export const updateMobileSuitById = async (id: string, mobileSuitData: Partial<MobileSuit>): Promise<MobileSuit> => {
    try {
        await updateDocument(MOBILE_SUITS_COLLECTION, id, mobileSuitData);

        return { id, ...mobileSuitData } as MobileSuit;
    } catch (error) {
        throw new Error(`Mobile suit with id ${id} not found.`);
    }
};

export const deleteMobileSuitById = async (id: string): Promise<void> => {
    await deleteDocument(MOBILE_SUITS_COLLECTION, id);
}