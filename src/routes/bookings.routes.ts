import { Router } from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookings.controller.js";
import { authenticate, requireGuest } from "../middlewares/auth.middleware.js";
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
const router = Router();

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllBookings);
/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.get("/:id", authenticate, getBookingById);
/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking (Guest only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingInput'
 *     responses:
 *       201:
 *         description: Booking created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Only guests allowed)
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticate, requireGuest, createBooking);
/**
 * @swagger
 * /bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED]
 *     responses:
 *       200:
 *         description: Booking status updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Invalid status
 */
router.patch("/:id/status", authenticate, updateBookingStatus);
/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.delete("/:id", authenticate, deleteBooking);

export default router;