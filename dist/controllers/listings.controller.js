import { listings } from "../models/listing.model.js";
export function getAllListings(req, res) {
    res.json(listings);
}
export function getListingById(req, res) {
    const id = parseInt(req.params.id);
    const listing = listings.find(l => l.id === id);
    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
}
export function createListing(req, res) {
    const { title, description, location, pricePerNight, guests, type, amenities, rating, host } = req.body;
    if (!title || !description || !location || !pricePerNight || !guests || !type || !amenities || !rating || !host) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const newListing = {
        id: listings.length + 1,
        title,
        description,
        location,
        pricePerNight,
        guests,
        type,
        amenities,
        rating,
        host
    };
    listings.push(newListing);
    res.status(201).json(newListing);
}
export function updateListing(req, res) {
    const id = parseInt(req.params.id);
    const listingIndex = listings.findIndex(l => l.id === id);
    if (listingIndex === -1) {
        return res.status(404).json({ error: "Listing not found" });
    }
    listings[listingIndex] = { ...listings[listingIndex], ...req.body };
    res.json(listings[listingIndex]);
}
export function deleteListing(req, res) {
    const id = parseInt(req.params.id);
    const listingIndex = listings.findIndex(l => l.id === id);
    if (listingIndex === -1) {
        return res.status(404).json({ error: "Listing not found" });
    }
    listings.splice(listingIndex, 1);
    res.status(200).json({ message: "Listing deleted successfully" });
}
//# sourceMappingURL=listings.controller.js.map