export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  guests: number;
  type:"apartment" | "house" | "villa" | "cabin";
  amenities: string[];
  rating: number;
  host:string;
}
export const listings: Listing[] = [
  {
    id: 1,
    title: "Cozy Apartment",
    description: "A beautiful apartment in the heart of the city.",
    location: "New York, NY",
    pricePerNight: 150,
    guests: 4,
    type: "apartment",
    amenities: ["WiFi", "Kitchen", "Parking"],
    rating: 4.5,
    host: "John Doe"
  },
  {
    id: 2,
    title: "Beach House",
    description: "A stunning house right on the beach.",
    location: "Miami, FL",
    pricePerNight: 300,
    guests: 8,
    type: "house",
    amenities: ["WiFi", "Kitchen", "Beach Access"],
    rating: 4.8,
    host: "Jane Smith"
  },
  {
    id: 3,
    title: "Mountain Cabin",
    description: "A cozy cabin in the mountains.",
    location: "Aspen, CO",
    pricePerNight: 200,
    guests: 6,
    type: "cabin",
    amenities: ["WiFi", "Kitchen", "Fireplace"],
    rating: 4.6,
    host: "Bob Johnson"
  }

];