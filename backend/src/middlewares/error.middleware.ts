import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/GlobalErrorHandler.js";

export const errorMiddleware = (
  err: Error, // AppError IS-A Error
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // operational error, send to the client
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unexpected bug, don't show it to the client
  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    // only show stack in development
  });
}