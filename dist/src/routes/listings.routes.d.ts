/**
 * @swagger
 * components:
 *   schemas:
 *     Listing:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         pricePerNight:
 *           type: number
 *         guests:
 *           type: integer
 *         buildingType:
 *           type: string
 *           enum: [Apartment, House, Villa, Cabin]
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *         rating:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         host:
 *           $ref: '#/components/schemas/User'
 *         bookings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Booking'
 */
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=listings.routes.d.ts.map