import { Request, Response, NextFunction } from "express";

/**
 * Represents a middleware function type for Express.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns void
 */
export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction) => void;