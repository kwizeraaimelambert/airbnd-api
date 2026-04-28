import { Router } from 'express';
import { getAllReviews, getReviewById, createReview, getReviewsByListing, getReviewsByUser, } from '../controllers/review.controller.js';
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
const router = Router();
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.get("/listing/:listingId", getReviewsByListing);
router.get("/user/:userId", getReviewsByUser);
export default router;
//# sourceMappingURL=reviews.routes.js.map