import express from "express";
import { validateRequest } from "../middleware/validate";
import * as missionController from "../controllers/missionController";
import { missionSchemas } from "../validation/missionSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const missionRouter = express.Router();

/**
 * @openapi
 * /api/v1/missions:
 *   post:
 *     tags:
 *       - Missions
 *     summary: Create a mission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMissionRequest'
 *     responses:
 *       201:
 *         description: Mission created.
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
 *       - Missions
 *     summary: Get all missions
 *     responses:
 *       200:
 *         description: List of missions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *
 * /api/v1/missions/{id}:
 *   get:
 *     tags:
 *       - Missions
 *     summary: Get a mission by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mission retrieved.
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
 *       - Missions
 *     summary: Update a mission by ID
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
 *             $ref: '#/components/schemas/UpdateMissionRequest'
 *     responses:
 *       200:
 *         description: Mission updated.
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
 *       - Missions
 *     summary: Delete a mission by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mission deleted.
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
missionRouter.post(
    "/missions",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander"] }),
    validateRequest(missionSchemas.create),
    missionController.createMissionHandler
);

missionRouter.get(
    "/missions",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander", "pilot"] }),
    missionController.getAllMissionsHandler
);

missionRouter.get(
    "/missions/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander", "pilot"] }),
    validateRequest(missionSchemas.getById),
    missionController.getMissionByIdHandler
);

missionRouter.put(
    "/missions/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander"] }),
    validateRequest(missionSchemas.update),
    missionController.updateMissionHandler
);

missionRouter.delete(
    "/missions/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander"] }),
    validateRequest(missionSchemas.delete),
    missionController.deleteMissionHandler
);

export default missionRouter;
