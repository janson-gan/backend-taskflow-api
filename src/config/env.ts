import dotenv from "dotenv";

dotenv.config();

/**
 * Environment configuration
 * Centralize place to validate and access environment variables
 */

const requireEnvVars = ["PORT", "NODE_ENV", "DATABASE_URL"];

// Check required environment at startup
requireEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  isDevelopment: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV || "production",
  isTest: process.env.NODE_ENV || "test",
};

export default config;
