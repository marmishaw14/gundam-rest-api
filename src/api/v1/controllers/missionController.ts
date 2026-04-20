import { Request, Response, NextFunction } from "express";
import * as missionService from "../services/missionService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Mission } from "../models/missionModel";

/**
 * Handles creating a new mission.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createMissionHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mission: Mission = await missionService.createMission(req.body);
        res.status(HTTP_STATUS.CREATED).json(successResponse(mission));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles getting all missions.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllMissionsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const missions: Mission[] = await missionService.getAllMissions();
        res.status(HTTP_STATUS.OK).json(successResponse(missions, "List of missions retrieved successfully."));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles getting a mission by its id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getMissionByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mission: Mission = await missionService.getMissionById(req.params.id as string);
        res.status(HTTP_STATUS.OK).json(successResponse(mission, `Mission with id: ${req.params.id} retrieved successfully.`));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles updating mission information by its id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateMissionHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mission: Mission = await missionService.updateMissionById(req.params.id as string, req.body);
        res.status(HTTP_STATUS.OK).json(successResponse(mission, "Mission information updated."));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles deleting a mission by its id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deleteMissionHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await missionService.deleteMissionById(req.params.id as string);
        res.status(HTTP_STATUS.OK).json(successResponse({}, "Mission deleted."));
    } catch (error: unknown) {
        next(error);
    }
};
