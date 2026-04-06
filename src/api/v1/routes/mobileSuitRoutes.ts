import express from "express";
import { validateRequest } from "../middleware/validate";
import * as mobileSuitController from "../controllers/mobileSuitController";
import { mobileSuitSchemas } from "../validation/mobileSuitSchemas";

const mobileSuitRouter = express.Router();

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