/**
 * @swagger
 * components:
 *   schemas:
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Alice
 *         email:
 *           type: string
 *           example: alice@gmail.com
 *         username:
 *           type: string
 *           example: alice123
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [guest, host, admin]
 *           example: guest
 *         avatar:
 *           type: string
 *           nullable: true
 *           example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *         bio:
 *           type: string
 *           nullable: true
 *           example: "Travel enthusiast and food lover."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-15T10:30:00.000Z
 *
 *     CreateUserInput:
 *       type: object
 *       required: [name, email, username]
 *       properties:
 *         name:
 *           type: string
 *           example: Alice
 *         email:
 *           type: string
 *           example: alice@gmail.com
 *         username:
 *           type: string
 *           example: alice123
 *
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         username:
 *           type: string
 *
 *     RegisterInput:
 *       type: object
 *       required: [name, email, username, password]
 *       properties:
 *         name:
 *           type: string
 *           example: Alice
 *         email:
 *           type: string
 *           example: alice@gmail.com
 *         username:
 *           type: string
 *           example: alice123
 *         password:
 *           type: string
 *           example: secret123
 *
 *     LoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           example: alice@gmail.com
 *         password:
 *           type: string
 *           example: secret123
 */
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=users.routes.d.ts.map