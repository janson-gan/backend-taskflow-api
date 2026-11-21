import express, { Express, Request, Response, NextFunction } from "express";
import { config } from "./config/env";
import healthRouter from "./routes/health";

/**
 * Create and configure express application
 */

export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()} ${req.method}, ${req.path}]`);
    next();
  });

  // V1 endpoint routes
  app.use("/api/v1/health", healthRouter);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Error handling middleware
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandle error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

/**
 * Start the server
 */
export function startServer(app: Express): void {
  app.listen(config.port, () => {
    console.log(
      `Server running on [http://localhost](http://localhost):${config.port}`,
    );
    console.log(`Environment: ${config.nodeEnv}`);
  });
}
