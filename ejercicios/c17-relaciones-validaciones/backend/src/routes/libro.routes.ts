import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/libro.validation";
import { validate, validateParams } from "../middlewares/validate.middleware";

const router = Router();

// GET sin validation (no body ni params)
router.get("/", libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);


// POST y PUT con validation
router.post("/", validate(libroCreateSchema), libroController.create);
router.put("/:id", validate(libroUpdateSchema), libroController.update);

// DELETE sin validation
router.delete("/:id", libroController.remove);

export default router;
