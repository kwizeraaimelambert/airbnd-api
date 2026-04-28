import { Router } from "express";
import { register, login, getMe, changePassword, forgotPassword, resetPassword, } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
/**
 * @swagger
 * components:
 *   schemas:
 *
 *    RegisterInput:
 *     type: object
 *     required: [name, email, username,phone, password, role]
 *     properties:
 *        name:
 *          type: string
 *          example: Alice
 *        email:
 *          type: string
 *          example:alice@gmail.com
 *        username:
 *          type: string
 *          example: alice123
 *        phone:
 *          type: string
 *          example: "+1234567890"
 *        password:
 *          type: string
 *          example: secret123
 *        role:
 *          type: string
 *          enum: [guest, host, admin]
 *          example: guest
 *
 *
 *    LoginInput:
 *     type: object
 *     required: [email, password]
 *     properties:
 *        email:
 *          type: string
 *          example:alice@gmail.com
 *        password:
 *          type: string
 *          example: secret123
 */
const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Email already in use
 */
router.post("/register", register); // public
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiJ9...
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login); // public
router.get("/me", authenticate, getMe); // protected
router.post("/change-password", authenticate, changePassword); // protected
router.post("/forgot-password", forgotPassword); // public
router.post("/reset-password/:token", resetPassword); // public
export default router;
//# sourceMappingURL=auth.routes.js.map