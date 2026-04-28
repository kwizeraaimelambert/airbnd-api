import { Router } from 'express';
import {
    getAllReviews,
    getReviewById,
    createReview,
    getReviewsByListing,
    getReviewsByUser,
} from '../controllers/review.controller.js';
import { authenticate, requireGuest } from '../middlewares/auth.middleware.js';
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
const router = Router();
/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllReviews);
/**
 * @swagger
 * /reviews/listing/{listingId}:
 *   get:
 *     summary: Get reviews for a listing
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */
router.get("/listing/:listingId", authenticate, getReviewsByListing);
/**
 * @swagger
 * /reviews/user/{userId}:
 *   get:
 *     summary: Get reviews by user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", authenticate, getReviewsByUser);
/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
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
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
router.get("/:id", authenticate, getReviewById);
/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a review (Guest only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewInput'
 *     responses:
 *       201:
 *         description: Review created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only guests allowed
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticate, requireGuest, createReview);
export default router; 