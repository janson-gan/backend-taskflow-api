import { Router, Request, Response } from "express";

const app = Router();

/**
 * Health check endpoint
 * Used by load balancers and monitoring systems to verify service is alive
 *
 * Response includes:
 * - status: service health status
 * - timestamp: when response was generated (UTC)
 */

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default app;
