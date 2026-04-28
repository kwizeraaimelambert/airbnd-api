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
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=auth.routes.d.ts.map