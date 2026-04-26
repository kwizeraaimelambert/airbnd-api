import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

function isKnownPrismaError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err
  );
}

export async function getAllListings(req: Request, res: Response) {
  console.log("Received query parameters:", req.query);
  const { location, type, minPrice, maxPrice, guests } = req.query;

  const listings = await prisma.listing.findMany({
    where: {
      ...(location && { location: { contains: location as string, mode: "insensitive" } }),
      ...(type && { type: type as any }),
      ...(guests && { guests: { gte: parseInt(guests as string) } }),
      ...(minPrice || maxPrice) && {
        pricePerNight: {
          ...(minPrice && { gte: parseFloat(minPrice as string) }),
          ...(maxPrice && { lte: parseFloat(maxPrice as string) }),
        },
      },
    },
    include: { host: { select: { id: true, name: true, avatar: true } } },
  });

  return res.json(listings);
}

export async function getListingById(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);

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

export async function getListingsByHost(req: Request, res: Response) {
  const hostId = parseInt(req.params.hostId as string);

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

export async function createListing(req: AuthRequest, res: Response) {
  const { title, description, location, pricePerNight, guests, type, amenities } = req.body;

  if (!title || !description || !location || !pricePerNight || !guests || !type) {
    return res.status(400).json({ error: "Missing required fields: title, description, location, pricePerNight, guests, type, hostId" });
  }
  const hostId = req.userId!;
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
  } catch (err) {
    if (isKnownPrismaError(err) && (err as { code: string }).code === "P2003") {
      return res.status(404).json({ error: "Host not found" });
    }
    throw err;
  }
}

export async function updateListing(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);

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

export async function deleteListing(req: AuthRequest, res: Response) {
  const id = parseInt(req.params.id as string);
  const userId = req.userId!;
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