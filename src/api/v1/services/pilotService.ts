import { Pilot } from "../models/pilotModel";
import { createDocument } from "../repositories/firestoreRepository";

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