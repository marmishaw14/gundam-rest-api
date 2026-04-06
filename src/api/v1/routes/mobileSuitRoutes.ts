import express from "express";
import { validateRequest } from "../middleware/validate";
import * as mobileSuitController from "../controllers/mobileSuitController";
import { mobileSuitSchemas } from "../validation/mobileSuitSchemas";

const mobileSuitRouter = express.Router();

/**
 * @openapi
 * /api/v1/mobile-suits:
 *   post:
 *     tags:
 *       - Mobile Suits
 *     summary: Create a mobile suit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMobileSuitRequest'
 *     responses:
 *       201:
 *         description: Mobile suit created.
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
 *       - Mobile Suits
 *     summary: Get all mobile suits
 *     responses:
 *       200:
 *         description: List of mobile suits.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *
 * /api/v1/mobile-suits/{id}:
 *   get:
 *     tags:
 *       - Mobile Suits
 *     summary: Get a mobile suit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mobile suit retrieved.
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
 *       - Mobile Suits
 *     summary: Update a mobile suit by ID
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
 *             $ref: '#/components/schemas/UpdateMobileSuitRequest'
 *     responses:
 *       200:
 *         description: Mobile suit updated.
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
 *       - Mobile Suits
 *     summary: Delete a mobile suit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mobile suit deleted.
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
mobileSuitRouter.post(
    "/mobile-suits",
    validateRequest(mobileSuitSchemas.create),
    mobileSuitController.createMobileSuitHandler
);

mobileSuitRouter.get(
    "/mobile-suits",
    mobileSuitController.getAllMobileSuitsHandler
);

mobileSuitRouter.get(
    "/mobile-suits/:id",
    validateRequest(mobileSuitSchemas.getById),
    mobileSuitController.getMobileSuitByIdHandler
);

mobileSuitRouter.put(
    "/mobile-suits/:id",
    validateRequest(mobileSuitSchemas.update),
    mobileSuitController.updateMobileSuitHandler
);

mobileSuitRouter.delete(
    "/mobile-suits/:id",
    validateRequest(mobileSuitSchemas.delete),
    mobileSuitController.deleteMobileSuitHandler
);

export default mobileSuitRouter;
