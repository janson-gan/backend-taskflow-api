import dotenv from "dotenv";

// Load environment variables BEFORE importing anything else
dotenv.config();

import { createApp, startServer } from "./server";

async function main(): Promise<void> {
  try {
    const app = createApp();
    startServer(app);
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

main();
