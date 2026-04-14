import express from "express";
import { validateRequest } from "../middleware/validate";
import * as pilotController from "../controllers/pilotController";
import { pilotSchemas } from "../validation/pilotSchemas";

const pilotRouter = express.Router();

pilotRouter.post(
    "/pilots",
    validateRequest(pilotSchemas.create),
    pilotController.createPilotHandler
);

pilotRouter.get(
    "/pilots",
    pilotController.getAllPilotsHandler
)

export default pilotRouter;