import express from "express";
import { validateRequest } from "../middleware/validate";
import * as pilotController from "../controllers/pilotController";
import { pilotSchemas } from "../validation/pilotSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const pilotRouter = express.Router();

/**
 * @openapi
 * /api/v1/pilots:
 *   post:
 *     tags:
 *       - Pilots
 *     summary: Create a pilot
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePilotRequest'
 *     responses:
 *       201:
 *         description: Pilot created.
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
 *       401:
 *         description: Missing or invalid bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *       403:
 *         description: Insufficient role/permissions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *   get:
 *     tags:
 *       - Pilots
 *     summary: Get all pilots
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pilots.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiSuccess'
 *       401:
 *         description: Missing or invalid bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *       403:
 *         description: Insufficient role/permissions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *
 * /api/v1/pilots/{id}:
 *   get:
 *     tags:
 *       - Pilots
 *     summary: Get a pilot by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pilot retrieved.
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
 *       401:
 *         description: Missing or invalid bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *       403:
 *         description: Insufficient role/permissions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *   put:
 *     tags:
 *       - Pilots
 *     summary: Update a pilot by ID
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/UpdatePilotRequest'
 *     responses:
 *       200:
 *         description: Pilot updated.
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
 *       401:
 *         description: Missing or invalid bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *       403:
 *         description: Insufficient role/permissions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *   delete:
 *     tags:
 *       - Pilots
 *     summary: Delete a pilot by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pilot deleted.
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
 *       401:
 *         description: Missing or invalid bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 *       403:
 *         description: Insufficient role/permissions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiAuthError'
 */
pilotRouter.post(
    "/pilots",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    validateRequest(pilotSchemas.create),
    pilotController.createPilotHandler
);

pilotRouter.get(
    "/pilots",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander"] }),
    pilotController.getAllPilotsHandler
);

pilotRouter.get(
    "/pilots/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander"] }),
    validateRequest(pilotSchemas.getById),
    pilotController.getPilotByIdHandler
);

pilotRouter.put(
    "/pilots/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "commander"] }),
    validateRequest(pilotSchemas.update),
    pilotController.updatePilotByIdHandler
);

pilotRouter.delete(
    "/pilots/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    validateRequest(pilotSchemas.delete),
    pilotController.deletePilotHandler
);

export default pilotRouter;
