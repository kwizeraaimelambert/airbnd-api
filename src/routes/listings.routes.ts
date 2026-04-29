import { Router } from "express";
import {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  uploadImages,
  deleteImage,
  getListingStats,
} from "../controllers/listings.controller.js";
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
router.get("/", getAllListings);                              // public
/**
 * @swagger
 * /listings/stats:
 *   get:
 *     summary: Get listing statistics grouped by location
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Listing statistics by location
 */
router.get("/stats", getListingStats);                        // public
/**
 * @swagger
 * /listings/{id}:
 *   get:
 *     summary: Get a listing by ID
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Listing ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Listing found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Listing not found
 */
router.get("/:id", getListingById);                          // public
/**
 * @swagger
 * /listings:
 *   post:
 *     summary: Create a new listing (Host only)
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, location, pricePerNight, guests, buildingType]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               pricePerNight:
 *                 type: number
 *               guests:
 *                 type: integer
 *               buildingType:
 *                 type: string
 *                 enum: [APARTMENT, HOUSE, VILLA, CABIN]
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Listing created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only hosts allowed
 */
router.post("/", authenticate, requireHost, createListing);  // HOST only
/**
 * @swagger
 * /listings/{id}:
 *   put:
 *     summary: Update a listing (Owner only)
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               pricePerNight:
 *                 type: number
 *               guests:
 *                 type: integer
 *               buildingType:
 *                 type: string
 *                 enum: [APARTMENT, HOUSE, VILLA, CABIN]
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Listing updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not owner
 *       404:
 *         description: Listing not found
 */
router.put("/:id", authenticate, updateListing);             // HOST + owner check in controller
/**
 * @swagger
 * /listings/{id}:
 *   delete:
 *     summary: Delete a listing (Owner only)
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Listing deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not owner
 *       404:
 *         description: Listing not found
 */
router.delete("/:id", authenticate, deleteListing);          // HOST + owner check in controller
/**
 * @swagger
 * /listings/{id}/photos:
 *   post:
 *     summary: Upload listing images (Owner only)
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not owner
 */
router.post("/:id/photos", authenticate, upload.array("images"), uploadImages);             // HOST + owner check in controller
/**
 * @swagger
 * /listings/{id}/photos/{photoId}:
 *   delete:
 *     summary: Delete a listing image (Owner only)
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Photo identifier
 *     responses:
 *       200:
 *         description: Image deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not owner
 *       404:
 *         description: Image not found
 */
router.delete("/:id/photos/:photoId", authenticate, deleteImage);          // HOST + owner check in controller

export default router;