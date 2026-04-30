/**
 * @swagger
 * components:
 *    schemas:
 *     Booking:
 *      type: object
 *      properties:
 *         id:
 *            type: integer
 *         listingId:
 *            type: integer
 *         listing:
 *            $ref: '#/components/schemas/Listing'
 *         guest:
 *            $ref: '#/components/schemas/User'
 *         checkin:
 *            type: string
 *            format: date
 *         checkout:
 *            type: string
 *            format: date
 *         status:
 *            type: string
 *            enum: [pending, confirmed, cancelled]
 *         createdAt:
 *            type: string
 *            format: date-time
 *
 *     CreateBookingInput:
 *      type: object
 *      required: [userId,listingId, checkin, checkout]
 *      properties:
 *        userId:
 *          type: integer
 *        listingId:
 *          type: integer
 *        checkin:
 *          type: string
 *          format: date
 *        checkout:
 *          type: string
 *          format: date
 */
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=bookings.routes.d.ts.map