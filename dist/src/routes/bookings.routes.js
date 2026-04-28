import { Router } from "express";
import { getAllBookings, getBookingById, createBooking, updateBookingStatus, deleteBooking, } from "../controllers/bookings.controller.js";
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
 */
const router = Router();
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.patch("/:id/status", updateBookingStatus);
router.delete("/:id", deleteBooking);
export default router;
//# sourceMappingURL=bookings.routes.js.map