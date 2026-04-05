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

/**
 * Handles getting a weapon in the artillery by its id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object. 
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getWeaponByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const weapon: Weapon = await weaponService.getWeaponById(req.params.id as string);
        res.status(HTTP_STATUS.OK).json(successResponse(weapon, `Weapon with id: ${req.params.id} retrieved successfully.`));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles updating a weapon's information in the artillery by its id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object. 
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateWeaponHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const weapon: Weapon = await weaponService.updateWeaponById(req.params.id as string, req.body);
        res.status(HTTP_STATUS.OK).json(successResponse(weapon, "Weapon information updated."));
    } catch (error: unknown) {
        next(error);
    }
};
