import { Router } from "express";
import * as autorController from "../controllers/autor.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { idParamSchema } from "../validations/autor.validation";
import { autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";


const router = Router();

router.get("/", autorController.getAll);
router.get("/:id", validateParams(idParamSchema), autorController.getById);

// POST con admin auth + validation
router.post("/", authenticate, authorize("ADMIN"), validate(autorCreateSchema), autorController.create);

// PUT con admin auth + params validation + body validation
router.put("/:id", validateParams(idParamSchema), validate(autorUpdateSchema), 
        authenticate, authorize("ADMIN"), autorController.update);

// DELETE con admin auth + params validation
router.delete("/:id", validateParams(idParamSchema), 
       authenticate, authorize("ADMIN"), autorController.remove);

export default router;