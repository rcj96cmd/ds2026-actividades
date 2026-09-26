import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/libro.validation";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";


const router = Router();

router.get("/", libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);

// POST con admin auth + validation
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), libroController.create);

// PUT con admin auth + params validation + body validation
router.put("/:id",authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(libroUpdateSchema), libroController.update);

// DELETE con admin auth + params validation
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), libroController.remove);

export default router;