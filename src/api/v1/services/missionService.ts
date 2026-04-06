import { Mission } from "../models/missionModel";
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from "../repositories/firestoreRepository";

const MISSIONS_COLLECTION = "missions";

export const createMission = async (missionData: Mission): Promise<Mission> => {

    const mission = {
        missionName: missionData.missionName,
        missionDescription: missionData.missionDescription,
        missionType: missionData.missionType,
        missionLocation: missionData.missionLocation,
        missionPriority: missionData.missionPriority,
        missionStatus: missionData.missionStatus,
        mobileSuitIds: missionData.mobileSuitIds,
        pilotIds: missionData.pilotIds
    };

    const id = await createDocument<Mission>(MISSIONS_COLLECTION, mission);
    return {id, ...mission};
};

export const getAllMissions = async (): Promise<Mission[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(MISSIONS_COLLECTION);

    return snapshot.docs.map((doc) => {
        const missionData = doc.data();
        return {
            id: doc.id,
            ...missionData
        } as Mission;
    });
};

export const getMissionById = async (id: string): Promise<Mission> => {
    const doc: FirebaseFirestore.DocumentSnapshot | null = await getDocumentById(MISSIONS_COLLECTION, id);

    if (!doc) {
        throw new Error(`Mission with id ${id} not found.`);
    }

    return doc.data() as Mission;
};

export const updateMissionById = async (id: string, missionData: Partial<Mission>): Promise<Mission> => {
    try {
        await updateDocument(MISSIONS_COLLECTION, id, missionData);

        return { id, ...missionData } as Mission;
    } catch (error) {
        throw new Error(`Mission with id ${id} not found.`);
    }
};

export const deleteMissionById = async (id: string): Promise<void> => {
    await deleteDocument(MISSIONS_COLLECTION, id);
};