import { Request, Response, NextFunction } from "express";
import * as mobileSuitService from "../services/mobileSuitService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { MobileSuit } from "../models/mobileSuitModel";

export const createMobileSuitHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mobileSuit: MobileSuit = await mobileSuitService.createMobileSuit(req.body);
        res.status(HTTP_STATUS.CREATED).json(successResponse(mobileSuit));
    } catch (error: unknown) {
        next (error);
    }
};