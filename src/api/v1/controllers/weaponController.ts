import { Request, Response, NextFunction } from "express";
import * as weaponService from "../services/weaponService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Weapon } from "../models/weaponModel";

/**
 * Handles creating a new weapon.
 * @param {Request} req - The request object. 
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} 
 */
export const createWeaponHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const weapon: Weapon = await weaponService.createWeapon(req.body);
        res.status(HTTP_STATUS.CREATED).json(successResponse(weapon));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles getting all weapons.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllWeaponsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const weapons: Weapon[] = await weaponService.getAllWeapons();
        res.status(HTTP_STATUS.OK).json(successResponse(weapons, "Weapons available for use retrieved successfully."));
    } catch (error: unknown) {
        next(error);
    }
};
