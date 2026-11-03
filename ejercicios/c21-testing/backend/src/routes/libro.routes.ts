import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/libro.validation";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";


const router = Router();

router.get("/", asyncHandler(libroController.getAll));
router.get("/:id", validateParams(idParamSchema), asyncHandler(libroController.getById));

// POST con admin auth + validation
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), asyncHandler(libroController.create));

// PUT con admin auth + params validation + body validation
router.put("/:id",authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(libroUpdateSchema), asyncHandler(libroController.update));

// DELETE con admin auth + params validation
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), asyncHandler(libroController.remove));

export default router;
