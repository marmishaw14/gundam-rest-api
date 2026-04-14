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
);

pilotRouter.get(
    "/pilots/:id",
    validateRequest(pilotSchemas.getById),
    pilotController.getPilotByIdHandler
);

pilotRouter.put(
    "/pilots/:id",
    validateRequest(pilotSchemas.update),
    pilotController.updatePilotByIdHandler
);

pilotRouter.delete(
    "/pilots/:id",
    validateRequest(pilotSchemas.delete),
    pilotController.deletePilotHandler
);

export default pilotRouter;