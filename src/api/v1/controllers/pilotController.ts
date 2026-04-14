import { Request, Response, NextFunction } from "express";
import * as pilotService from "../services/pilotService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Pilot } from "../models/pilotModel";

/**
 * Handles creating a new pilot.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createPilotHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const pilot: Pilot = await pilotService.createPilot(req.body);
        res.status(HTTP_STATUS.CREATED).json(successResponse(pilot));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles getting all pilots.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllPilotsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const pilots: Pilot[] = await pilotService.getAllPilots();
        res.status(HTTP_STATUS.OK).json(successResponse(pilots, "List of pilots retrieved successfully."));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles getting a pilot by their id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getPilotByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const pilot: Pilot = await pilotService.getPilotById(req.params.id as string);
        res.status(HTTP_STATUS.OK).json(successResponse(pilot, `Pilot with id: ${req.params.id} retrieved successfully.`));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles updating a pilot by their id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updatePilotByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const pilot: Pilot = await pilotService.updatePilotById(req.params.id as string, req.body);
        res.status(HTTP_STATUS.OK).json(successResponse(pilot, "Pilot information updated."));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles deleting/removing a pilot by their id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deletePilotHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await pilotService.deletePilotById(req.params.id as string);
        res.status(HTTP_STATUS.OK).json(successResponse({}, "Pilot deleted."));
    } catch (error: unknown) {
        next(error);
    }
};