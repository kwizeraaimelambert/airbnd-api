import { Router } from "express";
import {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  uploadImages,
  deleteImage,
} from "../controllers/listings.controller.js";
import { authenticate,requireHost } from "../middlewares/auth.middleware.js"; 
import upload from "../config/multer.js";
const router = Router();

// src/routes/listings.routes.ts

router.get("/", getAllListings);                              // public
router.get("/:id", getListingById);                          // public
router.post("/", authenticate, requireHost, createListing);  // HOST only
router.put("/:id", authenticate, updateListing);             // HOST + owner check in controller
router.delete("/:id", authenticate, deleteListing);          // HOST + owner check in controller
router.post("/:id/photos", authenticate,upload.array("images"), uploadImages);             // HOST + owner check in controller
router.delete("/:id/photos/:photoId", authenticate, deleteImage);          // HOST + owner check in controller

export default router;