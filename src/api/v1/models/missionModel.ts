/**
 * Types of missions that mobile suits go on.
 */
export type MissionType =
"reconnaissance" |
"testing" |
"escort" |
"defense" |
"infiltration" |
"assault" |
"top-secret"

/**
 * Types of mission statuses (ranging from in-progress to failed).
 */
export type MissionStatus =
"active" |
"completed" |
"abandoned" |
"failed"

/**
 * Types of mission priority (ranging from low to top secret).
 */
export type MissionPriority =
"low" |
"medium" |
"high" |
"critical"

/**
 * Interface representing a mission and its details.
 */
export interface Mission {
    id: string;
    missionName: string;
    missionDescription: string;
    missionType: MissionType;
    missionLocation: string;
    missionPriority: MissionPriority;
    missionStatus: MissionStatus;
    assignedAt?: Date | null;
    completedAt?: Date | null;
    mobileSuitIds: string[];
    pilotIds: string[];
};
