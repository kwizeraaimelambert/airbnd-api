import type { Request, Response } from "express";
export declare function getAllListings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getListingById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getListingsByHost(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createListing(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateListing(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteListing(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=listings.controller.d.ts.map