import express from "express";
import { validateRequest } from "../middleware/validate";
import * as pilotController from "../controllers/pilotController";
import { pilotSchemas } from "../validation/pilotSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const pilotRouter = express.Router();

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