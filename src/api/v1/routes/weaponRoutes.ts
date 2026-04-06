import express from "express";
import { validateRequest } from "../middleware/validate";
import * as weaponController from "../controllers/weaponController";
import { weaponSchemas } from "../validation/weaponSchemas";

const weaponRouter = express.Router();

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