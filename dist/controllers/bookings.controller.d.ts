import type { Request, Response } from "express";
export declare function getAllBookings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getBookingById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getBookingsByGuest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getBookingsByListing(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createBooking(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateBookingStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteBooking(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=bookings.controller.d.ts.map