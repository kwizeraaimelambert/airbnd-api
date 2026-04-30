import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
export declare function getAllListings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getListingById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getListingsByHost(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createListing(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateListing(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteListing(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function uploadImages(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getListingStats(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=listings.controller.d.ts.map