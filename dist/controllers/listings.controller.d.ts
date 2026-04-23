import type { Request, Response } from "express";
export declare function getAllListings(req: Request, res: Response): void;
export declare function getListingById(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function createListing(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function updateListing(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function deleteListing(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=listings.controller.d.ts.map