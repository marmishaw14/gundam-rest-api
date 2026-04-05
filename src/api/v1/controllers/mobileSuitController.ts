import { Request, Response, NextFunction } from "express";
import * as mobileSuitService from "../services/mobileSuitService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { MobileSuit } from "../models/mobileSuitModel";

/**
 * Handles creating a new mobile suit.
 * @param {Request} req - The request object. 
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} 
 */
export const createMobileSuitHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mobileSuit: MobileSuit = await mobileSuitService.createMobileSuit(req.body);
        res.status(HTTP_STATUS.CREATED).json(successResponse(mobileSuit));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles getting all mobile suits in the fleet.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object. 
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllMobileSuitsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mobileSuits: MobileSuit[] = await mobileSuitService.getAllMobileSuits();
        res.status(HTTP_STATUS.OK).json(successResponse(mobileSuits, "Fleet of mobile suits retrieved successfully."));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles getting a mobile suit in the fleet by its id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object. 
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getMobileSuitByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mobileSuit: MobileSuit = await mobileSuitService.getMobileSuitById(req.params.id as string);
        res.status(HTTP_STATUS.OK).json(successResponse(mobileSuit, `Mobile suit with id: ${req.params.id} retrieved successfully`));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles updating a mobile suit in the fleet by its id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object. 
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateMobileSuitHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mobileSuit: MobileSuit = await mobileSuitService.updateMobileSuitById(req.params.id as string, req.body);
        res.status(HTTP_STATUS.OK).json(successResponse(mobileSuit, "Mobile suit updated."));
    } catch (error: unknown) {
        next(error);
    }
}