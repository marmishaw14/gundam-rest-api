/**
 * Types of ranks a pilot can have (pertains to experience).
 */
export type PilotRank =
"rookie" |
"novice" |
"intermediate" |
"advanced" |
"veteran"

/**
 * Types of statuses a pilot can have ranging from active to unknown.
 */
export type PilotStatus =
"active" |
"injured" |
"retired" |
"deceased" |
"unknown"

/**
 * Interface representing a pilot and their characteristics.
 */
export interface Pilot {
    id: string;
    pilotName: string;
    pilotRank: PilotRank;
    pilotStatus: PilotStatus;
    assignedMobileSuitId: string;
    imageUrl: string;
};