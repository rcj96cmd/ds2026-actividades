import { Router } from "express";
import * as autorController from "../controllers/autor.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { idParamSchema } from "../validations/autor.validation";
import { autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";


const router = Router();

router.get("/", asyncHandler(autorController.getAll));
router.get("/:id", validateParams(idParamSchema), asyncHandler(autorController.getById));

// POST con admin auth + validation
router.post("/", authenticate, authorize("ADMIN"), validate(autorCreateSchema), asyncHandler(autorController.create));

// PUT con admin auth + params validation + body validation
router.put("/:id", validateParams(idParamSchema), validate(autorUpdateSchema),
        authenticate, authorize("ADMIN"), asyncHandler(autorController.update));

// DELETE con admin auth + params validation
router.delete("/:id", validateParams(idParamSchema),
       authenticate, authorize("ADMIN"), asyncHandler(autorController.remove));

export default router;
