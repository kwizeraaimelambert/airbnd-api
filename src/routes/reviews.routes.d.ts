/**
 * @swagger
 * components:
 *   schemas:
 *
 *    Review:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        listingId:
 *          type: integer
 *        listing:
 *          $ref: '#/components/schemas/Listing'
 *        userId:
 *          type: integer
 *        user:
 *          $ref: '#/components/schemas/User'
 *        rating:
 *          type: number
 *        comment:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *    CreateReviewInput:
 *      type: object
 *      required: [listingId,userId, rating,comment]
 *      properties:
 *        listingId:
 *          type: integer
 *        userId:
 *          type: integer
 *        rating:
 *          type: number
 *        comment:
 *          type: string
 *    ErrorResponse:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          example: "Resource not found"
 *    AuthResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        user:
 *          $ref: '#/components/schemas/User'
 */
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=reviews.routes.d.ts.map