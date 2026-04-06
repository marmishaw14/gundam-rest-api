import express from "express";
import { validateRequest } from "../middleware/validate";
import * as missionController from "../controllers/missionController";
import { missionSchemas } from "../validation/missionSchemas";

const missionRouter = express.Router();

missionRouter.post(
    "/missions",
    validateRequest(missionSchemas.create),
    missionController.createMissionHandler
);

missionRouter.get(
    "/missions",
    missionController.getAllMissionsHandler
);

missionRouter.get(
    "/missions/:id",
    validateRequest(missionSchemas.getById),
    missionController.getMissionByIdHandler
);

missionRouter.put(
    "/missions/:id",
    validateRequest(missionSchemas.update),
    missionController.updateMissionHandler
);

missionRouter.delete(
    "/missions/:id",
    validateRequest(missionSchemas.delete),
    missionController.deleteMissionHandler
);

export default missionRouter;