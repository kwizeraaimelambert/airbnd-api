import { Router } from "express";
import {
  register,
  login,
//   getMe,
//   changePassword,
//   forgotPassword,
//   resetPassword,
} from "../controllers/auth.controllers.js";
// import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);                          // public
router.post("/login", login);                                // public
// router.get("/me", authenticate, getMe);                      // protected
// router.post("/change-password", authenticate, changePassword); // protected
// router.post("/forgot-password", forgotPassword);             // public
// router.post("/reset-password/:token", resetPassword);        // public

export default router;