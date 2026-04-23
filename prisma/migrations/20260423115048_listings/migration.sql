-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "pricePerNight" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amenities" TEXT,
    "rating" INTEGER NOT NULL,
    "host" TEXT NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
