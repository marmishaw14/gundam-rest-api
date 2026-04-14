import { Pilot } from "../models/pilotModel";
import { createDocument, getDocumentById, getDocuments, updateDocument, deleteDocument } from "../repositories/firestoreRepository";

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

export const getPilotById = async (id: string): Promise<Pilot> => {
    const doc: FirebaseFirestore.DocumentSnapshot | null = await getDocumentById(PILOTS_COLLECTION, id);

    if (!doc) {
        throw new Error(`Mission with id ${id} not found.`);
    }

    return doc.data() as Pilot;
};

export const updatePilotById = async (id: string, pilotData: Partial<Pilot>): Promise<Pilot> => {
    try {
        await updateDocument(PILOTS_COLLECTION, id, pilotData);

        return { id, ...pilotData } as Pilot;
    } catch (error) {
        throw new Error(`Pilot with id ${id} not found.`);
    }
};

export const deletePilotById = async (id: string): Promise<void> => {
    await deleteDocument(PILOTS_COLLECTION, id);
};