import prisma from '../config/prisma.js';
export async function createReview(req, res) {
    const { listingId, userId, rating, comment } = req.body;
    if (!listingId || !userId || !rating) {
        return res.status(400).json({ error: "listingId, userId and rating are required" });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    const review = await prisma.review.create({
        data: {
            listingId,
            userId,
            rating,
            comment,
        },
    });
    return res.status(201).json(review);
}
export async function getReviewsByListing(req, res) {
    const listingId = parseInt(req.params.listingId);
    const reviews = await prisma.review.findMany({
        where: { listingId },
        include: { user: { select: { id: true, name: true, avatar: true } } },
    });
    return res.json(reviews);
}
export async function getReviewsByUser(req, res) {
    const userId = parseInt(req.params.userId);
    const reviews = await prisma.review.findMany({
        where: { userId },
        include: { listing: { select: { id: true, title: true, location: true } } },
    });
    return res.json(reviews);
}
export async function getReviewById(req, res) {
    const id = parseInt(req.params.id);
    const review = await prisma.review.findUnique({
        where: { id },
        include: { user: { select: { id: true, name: true, avatar: true } }, listing: { select: { id: true, title: true, location: true } } },
    });
    if (!review) {
        return res.status(404).json({ error: "Review not found" });
    }
    return res.json(review);
}
export async function getAllReviews(req, res) {
    const reviews = await prisma.review.findMany({
        include: { user: { select: { id: true, name: true, avatar: true } }, listing: { select: { id: true, title: true, location: true } } },
    });
    return res.json(reviews);
}
//# sourceMappingURL=review.controller.js.map