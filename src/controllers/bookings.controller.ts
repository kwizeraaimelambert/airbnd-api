import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

function isKnownPrismaError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err
  );
}

function calculateTotalPrice(checkin: Date, checkout: Date, pricePerNight: number): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((checkout.getTime() - checkin.getTime()) / msPerDay);
  return nights * pricePerNight;
}

export async function getAllBookings(req: Request, res: Response) {
  const bookings = await prisma.booking.findMany({
    include: {
      guest: { select: { id: true, name: true, avatar: true } },
      listing: { select: { id: true, title: true, location: true, pricePerNight: true } },
    },
  });

  return res.json(bookings);
}

export async function getBookingById(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      guest: { select: { id: true, name: true, avatar: true } },
      listing: true,
    },
  });

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  return res.json(booking);
}

export async function getBookingsByGuest(req: Request, res: Response) {
  const guestId = parseInt(req.params.guestId as string);

  const guest = await prisma.user.findUnique({ where: { id: guestId } });
  if (!guest) {
    return res.status(404).json({ error: "Guest not found" });
  }

  const bookings = await prisma.booking.findMany({
    where: { guestId },
    include: {
      listing: { select: { id: true, title: true, location: true, pricePerNight: true } },
    },
  });

  return res.json(bookings);
}

export async function getBookingsByListing(req: Request, res: Response) {
  const listingId = parseInt(req.params.listingId as string);

  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  const bookings = await prisma.booking.findMany({
    where: { listingId },
    include: {
      guest: { select: { id: true, name: true, avatar: true } },
    },
  });

  return res.json(bookings);
}

export async function createBooking(req: Request, res: Response, next: (err?: unknown) => void) {
  const { checkin, checkout, guestId, listingId } = req.body;

  if (!checkin || !checkout || !guestId || !listingId) {
    return res.status(400).json({ error: "Missing required fields: checkin, checkout, guestId, listingId" });
  }

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format for checkin or checkout" });
  }

  if (checkoutDate <= checkinDate) {
    return res.status(400).json({ error: "checkout must be after checkin" });
  }

  try {
    const [guest, listing] = await Promise.all([
      prisma.user.findUnique({ where: { id: guestId } }),
      prisma.listing.findUnique({ where: { id: listingId } }),
    ]);

    if (!guest) return res.status(404).json({ error: "Guest not found" });
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    // Use interactive transaction for atomic conflict check + booking creation
    const booking = await prisma.$transaction(async (tx) => {
      // Check for conflicting bookings on the same listing
      const conflict = await tx.booking.findFirst({
        where: {
          listingId,
          status: { not: "CANCELLED" },
          AND: [
            { chekin: { lt: checkoutDate } },
            { checkout: { gt: checkinDate } },
          ],
        },
      });

      if (conflict) {
        // Throw a custom error code for conflict
        const conflictError = new Error("BOOKING_CONFLICT") as Error & { code: string };
        conflictError.code = "BOOKING_CONFLICT";
        throw conflictError;
      }

      const totalPrice = calculateTotalPrice(checkinDate, checkoutDate, listing.pricePerNight);

      return tx.booking.create({
        data: {
          chekin: checkinDate,
          checkout: checkoutDate,
          totalPrice,
          status: "PENDING",
          guestId,
          listingId,
        },
      });
    });

    return res.status(201).json(booking);
  } catch (err) {
    if ((err as { code: string }).code === "BOOKING_CONFLICT") {
      return res.status(409).json({ error: "Listing is already booked for the selected dates" });
    }
    if (isKnownPrismaError(err) && (err as { code: string }).code === "P2003") {
      return res.status(404).json({ error: "Guest or listing not found" });
    }
    return next(err);
  }
}

export async function updateBookingStatus(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Missing required field: status" });
  }

  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Booking not found" });
  }

  if (existing.status === "CANCELLED") {
    return res.status(400).json({ error: "Cannot update a cancelled booking" });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  return res.json(updated);
}

export async function deleteBooking(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);

  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Booking not found" });
  }

  await prisma.booking.delete({ where: { id } });
  return res.status(200).json({ message: "Booking deleted successfully" });
}