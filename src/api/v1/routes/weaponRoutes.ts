import express from "express";
import { validateRequest } from "../middleware/validate";
import * as weaponController from "../controllers/weaponController";
import { weaponSchemas } from "../validation/weaponSchemas";

const weaponRouter = express.Router();

/**
 * @openapi
 * /api/v1/weapons:
 *   post:
 *     tags:
 *       - Weapons
 *     summary: Create a weapon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWeaponRequest'
 *     responses:
 *       201:
 *         description: Weapon created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiValidationError'
 *   get:
 *     tags:
 *       - Weapons
 *     summary: Get all weapons
 *     responses:
 *       200:
 *         description: List of weapons.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *
 * /api/v1/weapons/{id}:
 *   get:
 *     tags:
 *       - Weapons
 *     summary: Get a weapon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weapon retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiValidationError'
 *   put:
 *     tags:
 *       - Weapons
 *     summary: Update a weapon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWeaponRequest'
 *     responses:
 *       200:
 *         description: Weapon updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiValidationError'
 *   delete:
 *     tags:
 *       - Weapons
 *     summary: Delete a weapon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weapon deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiValidationError'
 */
weaponRouter.post(
    "/weapons",
    validateRequest(weaponSchemas.create),
    weaponController.createWeaponHandler
);


weaponRouter.get(
    "/weapons",
    weaponController.getAllWeaponsHandler
);

weaponRouter.get(
    "/weapons/:id",
    validateRequest(weaponSchemas.getById),
    weaponController.getWeaponByIdHandler
);

weaponRouter.put(
    "/weapons/:id",
    validateRequest(weaponSchemas.update),
    weaponController.updateWeaponHandler
);

weaponRouter.delete(
    "/weapons/:id",
    validateRequest(weaponSchemas.delete),
    weaponController.deleteWeaponHandler
);

export default weaponRouter;
