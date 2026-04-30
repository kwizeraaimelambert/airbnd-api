import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });
async function main() {
    console.log("🌱 Seeding database...");
    // Clean existing data first — order matters because of foreign keys
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.listing.deleteMany();
    await prisma.user.deleteMany();
    console.log("🗑️  Cleared existing data");
    // ─── Seed Users (2 Hosts, 3 Guests) ────────────────────────────────────────
    const hashedPassword = await bcrypt.hash("password123", 10);
    // Hosts (use upsert with email to prevent duplicates)
    const alice = await prisma.user.upsert({
        where: { email: "alice@example.com" },
        update: {},
        create: {
            name: "Alice Johnson",
            email: "alice@example.com",
            username: "alice_host",
            password: hashedPassword,
            role: "HOST",
            phone: "555-1234",
            avatar: "https://example.com/avatars/alice.jpg",
            bio: "Hi, I'm Alice! I love hosting travelers from around the world.",
        },
    });
    const david = await prisma.user.upsert({
        where: { email: "david@example.com" },
        update: {},
        create: {
            name: "David Lee",
            email: "david@example.com",
            username: "david_host",
            password: hashedPassword,
            role: "HOST",
            phone: "555-2234",
            avatar: "https://example.com/avatars/david.jpg",
            bio: "Welcome to my listings! I'm a superhost with many properties.",
        },
    });
    // Guests (use upsert with email to prevent duplicates)
    const bob = await prisma.user.upsert({
        where: { email: "bob@example.com" },
        update: {},
        create: {
            name: "Bob Smith",
            email: "bob@example.com",
            username: "bob_guest",
            password: hashedPassword,
            role: "GUEST",
            phone: "555-5678",
            avatar: "https://example.com/avatars/bob.jpg",
            bio: "Hi, I'm Bob! I'm excited to explore new places.",
        },
    });
    const carol = await prisma.user.upsert({
        where: { email: "carol@example.com" },
        update: {},
        create: {
            name: "Carol White",
            email: "carol@example.com",
            username: "carol_guest",
            password: hashedPassword,
            role: "GUEST",
            phone: "555-9012",
            avatar: "https://example.com/avatars/carol.jpg",
            bio: "Hi, I'm Carol! I love traveling and trying new foods.",
        },
    });
    const eve = await prisma.user.upsert({
        where: { email: "eve@example.com" },
        update: {},
        create: {
            name: "Eve Martinez",
            email: "eve@example.com",
            username: "eve_guest",
            password: hashedPassword,
            role: "GUEST",
            phone: "555-3456",
            avatar: "https://example.com/avatars/eve.jpg",
            bio: "Travel enthusiast and food lover!",
        },
    });
    console.log("👥 Created users (2 hosts, 3 guests)");
    // ─── Seed Listings (4 types: APARTMENT, HOUSE, VILLA, CABIN) ──────────────
    const listings = await prisma.listing.createManyAndReturn({
        data: [
            {
                title: "Cozy apartment in downtown",
                description: "A beautiful apartment in the heart of the city with modern amenities",
                location: "New York, NY",
                pricePerNight: 120,
                guests: 2,
                type: "APARTMENT",
                amenities: ["WiFi", "Kitchen", "Air conditioning", "TV", "Washer"],
                hostId: alice.id,
            },
            {
                title: "Beach house with ocean view",
                description: "Wake up to stunning ocean views every morning in this spacious house",
                location: "Miami, FL",
                pricePerNight: 250,
                guests: 6,
                type: "HOUSE",
                amenities: ["WiFi", "Pool", "Beach access", "BBQ", "Parking"],
                hostId: alice.id,
            },
            {
                title: "Luxury villa with private pool",
                description: "Experience ultimate luxury in this stunning villa with private pool",
                location: "Los Angeles, CA",
                pricePerNight: 450,
                guests: 8,
                type: "VILLA",
                amenities: ["WiFi", "Private pool", "Gym", "Home theater", "Parking"],
                hostId: david.id,
            },
            {
                title: "Mountain cabin retreat",
                description: "Escape the city in this peaceful mountain cabin with stunning views",
                location: "Denver, CO",
                pricePerNight: 180,
                guests: 4,
                type: "CABIN",
                amenities: ["Fireplace", "Hiking trails", "WiFi", "Hot tub", "Kitchen"],
                hostId: david.id,
            },
        ],
        skipDuplicates: true,
    });
    if (listings.length === 0) {
        throw new Error("Failed to create listings");
    }
    console.log("🏠 Created listings (APARTMENT, HOUSE, VILLA, CABIN)");
    // ─── Seed Bookings (3 with future dates, correct totalPrice) ───────────────
    const listing1 = listings[0];
    const listing2 = listings[1];
    const listing3 = listings[2];
    // Future dates (2026)
    const booking1 = await prisma.booking.create({
        data: {
            chekin: new Date("2026-06-01"),
            checkout: new Date("2026-06-05"),
            totalPrice: 4 * listing1.pricePerNight, // 4 nights × 120 = 480
            status: "CONFIRMED",
            guestId: bob.id,
            listingId: listing1.id,
        },
    });
    const booking2 = await prisma.booking.create({
        data: {
            chekin: new Date("2026-07-10"),
            checkout: new Date("2026-07-15"),
            totalPrice: 5 * listing2.pricePerNight, // 5 nights × 250 = 1250
            status: "PENDING",
            guestId: carol.id,
            listingId: listing2.id,
        },
    });
    const booking3 = await prisma.booking.create({
        data: {
            chekin: new Date("2026-08-20"),
            checkout: new Date("2026-08-25"),
            totalPrice: 5 * listing3.pricePerNight, // 5 nights × 450 = 2250
            status: "CONFIRMED",
            guestId: eve.id,
            listingId: listing3.id,
        },
    });
    console.log("📅 Created bookings (3 future dates, correct totalPrice)");
    // ─── Seed Reviews (7 total: 3 positive, 2 negative, 2 neutral) ────────────
    const listing4 = listings[3];
    // Positive reviews (rating 5)
    await prisma.review.createMany({
        data: [
            {
                rating: 5,
                comment: "Amazing stay! The apartment was exactly as described, clean and in a great location. Alice was a wonderful host.",
                userId: bob.id,
                listingId: listing1.id,
            },
            {
                rating: 5,
                comment: "Perfect mountain retreat! So peaceful and the cabin had everything we needed. Loved the fireplace and hot tub.",
                userId: carol.id,
                listingId: listing4.id,
            },
            {
                rating: 5,
                comment: "Absolutely stunning villa! The private pool was incredible and the home theater was a bonus. David was very responsive.",
                userId: bob.id,
                listingId: listing3.id,
            },
        ],
        skipDuplicates: true,
    });
    // Negative reviews (rating 1-2)
    await prisma.review.createMany({
        data: [
            {
                rating: 2,
                comment: "Disappointed with the stay. The apartment was not as clean as expected and there were noise issues from neighbors.",
                userId: eve.id,
                listingId: listing1.id,
            },
            {
                rating: 1,
                comment: "Terrible experience! The beach house had mold issues and the AC was not working properly. Host was unresponsive.",
                userId: eve.id,
                listingId: listing2.id,
            },
        ],
        skipDuplicates: true,
    });
    // Neutral/Other reviews (rating 3-4)
    await prisma.review.createMany({
        data: [
            {
                rating: 4,
                comment: "Great place with beautiful ocean views. The beach access was fantastic. Would definitely come back!",
                userId: carol.id,
                listingId: listing2.id,
            },
            {
                rating: 4,
                comment: "Nice apartment, good location for exploring the city. Could use some updates but would recommend to others.",
                userId: bob.id,
                listingId: listing1.id,
            },
        ],
        skipDuplicates: true,
    });
    console.log("⭐ Created reviews (3 positive, 2 negative, 2 neutral)");
    console.log("✅ Seeding complete!");
}
main()
    .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map