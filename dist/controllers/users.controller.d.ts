import type { Request, Response } from "express";
export declare function getAllUsers(req: Request, res: Response): Promise<void>;
export declare function getUserById(req: Request, res: Response): Promise<void>;
export declare function createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=users.controller.d.ts.map