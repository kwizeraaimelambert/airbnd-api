import type { Request, Response } from "express";
import { listings, type Listing } from "../models/listing.model.js";
import type { error } from "node:console";
export function getAllListings(req:Request,res:Response){
    res.json(listings)
}
export function getListingById(req:Request,res:Response){
    const id = parseInt(req.params.id as string);
    const listing = listings.find(l => l.id === id);
    if (!listing) {
       return res.status(404).json({ error: "Listing not found" });
        
    }
    res.json(listing);
}
export function createListing(req:Request,res:Response){
    const {title,description,location,pricePerNight,guests,type,amenities,rating,host} = req.body as Listing; 
    if(!title || !description || !location || !pricePerNight || !guests || !type || !amenities || !rating || !host){  
        return res.status(400).json({error:"Missing required fields"});  
    }
    const newListing:Listing = {
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
export function updateListing(req:Request,res:Response){
    const id = parseInt(req.params.id as string);
    const listingIndex = listings.findIndex(l => l.id === id);
    if (listingIndex === -1) {
        return res.status(404).json({ error: "Listing not found" });
    }  
    listings[listingIndex] = { ...listings[listingIndex], ...req.body } as Listing;
    res.json(listings[listingIndex]);
}
export function deleteListing(req:Request,res:Response){
    const id = parseInt(req.params.id as string);
    const listingIndex = listings.findIndex(l => l.id === id);   
    if (listingIndex === -1) {
        return res.status(404).json({ error: "Listing not found" });
    }
    listings.splice(listingIndex, 1);
    res.status(200).json({ message: "Listing deleted successfully" });
}   