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