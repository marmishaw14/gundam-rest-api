import { Pilot } from "../models/pilotModel";
import { createDocument, getDocuments } from "../repositories/firestoreRepository";

const PILOTS_COLLECTION = "pilots";

export const createPilot = async (pilotData: Pilot): Promise<Pilot> => {

    const pilot = {
        pilotName: pilotData.pilotName,
        pilotRank: pilotData.pilotRank,
        pilotStatus: pilotData.pilotStatus,
        assignedMobileSuitId: pilotData.assignedMobileSuitId,
        imageUrl: pilotData.imageUrl
    };

    const id = await createDocument<Pilot>(PILOTS_COLLECTION, pilot);
    return {id, ...pilot};
};

export const getAllPilots = async (): Promise<Pilot[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(PILOTS_COLLECTION);

    return snapshot.docs.map((doc) => {
        const pilotData = doc.data();
        return {
            id: doc.id,
            ...pilotData
        } as Pilot;
    });
};