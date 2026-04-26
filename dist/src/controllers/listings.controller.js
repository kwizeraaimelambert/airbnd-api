import prisma from "../config/prisma.js";
function isKnownPrismaError(err) {
    return (typeof err === "object" &&
        err !== null &&
        "code" in err);
}
export async function getAllListings(req, res) {
    console.log("Received query parameters:", req.query);
    const { location, type, minPrice, maxPrice, guests } = req.query;
    const listings = await prisma.listing.findMany({
        where: {
            ...(location && { location: { contains: location, mode: "insensitive" } }),
            ...(type && { type: type }),
            ...(guests && { guests: { gte: parseInt(guests) } }),
            ...(minPrice || maxPrice) && {
                pricePerNight: {
                    ...(minPrice && { gte: parseFloat(minPrice) }),
                    ...(maxPrice && { lte: parseFloat(maxPrice) }),
                },
            },
        },
        include: { host: { select: { id: true, name: true, avatar: true } } },
    });
    return res.json(listings);
}
export async function getListingById(req, res) {
    const id = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({
        where: { id },
        include: {
            host: { select: { id: true, name: true, avatar: true } },
            bookings: true,
        },
    });
    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }
    return res.json(listing);
}
export async function getListingsByHost(req, res) {
    const hostId = parseInt(req.params.hostId);
    const host = await prisma.user.findUnique({ where: { id: hostId } });
    if (!host) {
        return res.status(404).json({ error: "Host not found" });
    }
    const listings = await prisma.listing.findMany({
        where: { hostId },
        include: { bookings: true },
    });
    return res.json(listings);
}
export async function createListing(req, res) {
    const { title, description, location, pricePerNight, guests, type, amenities } = req.body;
    if (!title || !description || !location || !pricePerNight || !guests || !type) {
        return res.status(400).json({ error: "Missing required fields: title, description, location, pricePerNight, guests, type, hostId" });
    }
    const hostId = req.userId;
    try {
        const host = await prisma.user.findUnique({ where: { id: hostId } });
        if (!host) {
            return res.status(404).json({ error: "Host not found" });
        }
        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                location,
                pricePerNight,
                guests,
                type,
                amenities: amenities ?? [],
                hostId,
            },
        });
        return res.status(201).json(listing);
    }
    catch (err) {
        if (isKnownPrismaError(err) && err.code === "P2003") {
            return res.status(404).json({ error: "Host not found" });
        }
        throw err;
    }
}
export async function updateListing(req, res) {
    const id = parseInt(req.params.id);
    const existing = await prisma.listing.findUnique({ where: { id } });
    if (!existing) {
        return res.status(404).json({ error: "Listing not found" });
    }
    const { title, description, location, pricePerNight, guests, type, amenities, rating } = req.body;
    const updated = await prisma.listing.update({
        where: { id },
        data: {
            ...(title && { title }),
            ...(description && { description }),
            ...(location && { location }),
            ...(pricePerNight && { pricePerNight }),
            ...(guests && { guests }),
            ...(type && { type }),
            ...(amenities && { amenities }),
            ...(rating !== undefined && { rating }),
            updatedAt: new Date(),
        },
    });
    return res.json(updated);
}
export async function deleteListing(req, res) {
    const id = parseInt(req.params.id);
    const userId = req.userId;
    const existing = await prisma.listing.findUnique({ where: { id } });
    if (!existing) {
        return res.status(404).json({ error: "Listing not found" });
    }
    if (existing.hostId !== userId) {
        return res.status(403).json({ error: "You are not authorized to delete this listing" });
    }
    await prisma.listing.delete({ where: { id } });
    return res.status(200).json({ message: "Listing deleted successfully" });
}
//# sourceMappingURL=listings.controller.js.map