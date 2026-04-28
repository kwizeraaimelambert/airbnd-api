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
 */
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=reviews.routes.d.ts.map