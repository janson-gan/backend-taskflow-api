import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/server";

/**
 * Health Check Endpoint Tests
 *
 * Tests verify that:
 * 1. Endpoint responds with correct HTTP status
 * 2. Response has correct JSON structure
 * 3. Timestamp is valid ISO 8601 format
 */

describe("GET / health", () => {
  const app = createApp();

  describe("Success", () => {
    it("should return 200 OK with status ok", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("ok");
    });

    it("should return valid ISO 8601 timestamp", async () => {
      const response = await request(app).get("/health");

      expect(response.body.timestamp).toBeDefined();
      expect(new Date(response.body.timestamp).toISOString()).toBe(
        response.body.timestamp,
      );
    });

    it("Should return valid JSON content-type", async () => {
      const response = await request(app).get("/health");

      expect(response.type).toBe("application/json");
    });
  });

  describe("Response structure", () => {
    it("Should contain exactly required fiedls", async () => {
      const response = await request(app).get("/health");
      const bodyKeys = Object.keys(response.body);

      expect(bodyKeys.length).toBe(3);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("timestamp");
    });
  });
});
