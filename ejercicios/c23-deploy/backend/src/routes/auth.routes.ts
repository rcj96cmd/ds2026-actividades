import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registroSchema, loginSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";

const router = Router();

router.post("/registro", validate(registroSchema), asyncHandler(authController.registrar));
router.post("/login",    validate(loginSchema),    asyncHandler(authController.login));
router.get( "/yo",       authenticate,             asyncHandler(authController.yo));

export default router;
