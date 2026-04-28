import { Router } from "express";
import { getAllListings, getListingById, createListing, updateListing, deleteListing, uploadImages, deleteImage, } from "../controllers/listings.controller.js";
import { authenticate, requireHost } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";
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
 *           enum: [entire_place, private_room, shared_room]
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
const router = Router();
// src/routes/listings.routes.ts
/**
 * @swagger
 * /listings:
 *   get:
 *     summary: Get all listings
 *     tags: [Listings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *     responses:
 *       200:
 *         description: List of listings
 */
router.get("/", getAllListings); // public
router.get("/:id", getListingById); // public
router.post("/", authenticate, requireHost, createListing); // HOST only
router.put("/:id", authenticate, updateListing); // HOST + owner check in controller
router.delete("/:id", authenticate, deleteListing); // HOST + owner check in controller
router.post("/:id/photos", authenticate, upload.array("images"), uploadImages); // HOST + owner check in controller
router.delete("/:id/photos/:photoId", authenticate, deleteImage); // HOST + owner check in controller
export default router;
//# sourceMappingURL=listings.routes.js.map