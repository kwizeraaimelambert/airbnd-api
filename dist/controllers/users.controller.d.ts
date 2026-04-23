import type { Request, Response } from "express";
export declare function getAllUsers(req: Request, res: Response): void;
export declare function getUserById(req: Request, res: Response): void;
export declare function createUser(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function updateUser(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function deleteUser(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=users.controller.d.ts.map