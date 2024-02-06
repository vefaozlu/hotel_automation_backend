import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.route("/login").get(AuthController.loginView).post(AuthController.login);

router
  .route("/register")
  .get(AuthController.registerView)
  .post(AuthController.register);

export default router;