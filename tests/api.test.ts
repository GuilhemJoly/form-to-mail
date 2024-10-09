/**
 * @fileoverview This file contains integration tests for the `/send` endpoint of the contact API.
 * It uses the `supertest` library to simulate HTTP requests and the `jest` framework for assertions.
 * The tests ensure that the endpoint behaves correctly when sending emails with valid and invalid data.
 *
 * @module tests/api.test
 */
import request from "supertest";
import { describe, it, afterAll } from "@jest/globals";
import { expect } from "@jest/globals";
import logger from "../src/utils/logger";
import server from "../server";
import fs from "fs";
import path from "path";

/**
 * Test suite for the POST /send endpoint.
 *
 * @function
 * @name describe
 * @param {string} description - Description of the test suite.
 * @param {Function} callback - Callback function containing the test cases.
 */
describe("POST /send", () => {
  /**
   * Hook that runs once before all tests in the suite.
   *
   * @function
   * @name beforeAll
   * @param {Function} callback - Async callback function to set up the test environment.
   */
  beforeAll(async () => {
    logger.info("Server started for tests");
  });

  /**
   * Test case for sending an email with valid data.
   *
   * @function
   * @name it
   * @param {string} description - Description of the test case.
   * @param {Function} callback - Async callback function containing the test logic.
   */
  it("should send an email with valid data", async () => {
    const response = await request(server)
      .post("/api/send")
      .set("Content-Type", "application/json")
      .send({
        firstname: "Tom",
        lastname: "Pote",
        email: "tom.pote@example.com",
        subject: "Test Subject",
        message: "Test message content.",
      });

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Email sent:");
    logger.info("Test: Email sent successfully with valid data");
  });

  /**
   * Test case for handling missing fields in the request body.
   *
   * @function
   * @name it
   * @param {string} description - Description of the test case.
   * @param {Function} callback - Async callback function containing the test logic.
   */
  it("should return an error if fields are missing", async () => {
    const response = await request(server)
      .post("/api/send")
      .set("Content-Type", "application/json")
      .send({
        firstname: "Tom",
        lastname: "Pote",
        email: "tom.pote@example.com",
        subject: "",
        message: "Test message content.",
      });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Tous les champs sont requis.");
    logger.warn("Test: Validation failed due to missing fields");
  });

  /**
   * Test case for detecting honeypot headers.
   *
   * @function
   * @name it
   * @param {string} description - Description of the test case.
   * @param {Function} callback - Async callback function containing the test logic.
   */
  it("should detect honeypot headers", async () => {
    const honeypotLogPath = path.join(__dirname, "../src/config/honeypot.log");

    // Delete the honeypot log file if it exists
    if (fs.existsSync(honeypotLogPath)) {
      fs.unlinkSync(honeypotLogPath);
    }

    const response = await request(server)
      .post("/api/send")
      .set("Content-Type", "application/json")
      .set("X-Honeypot-Header-1", "honeypot-value")
      .send({
        firstname: "Tom",
        lastname: "Pote",
        email: "tom.pote@example.com",
        subject: "Test Subject",
        message: "Test message content.",
      });

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Email sent:");

    // Verify that the honeypot log file has been created and contains the expected entry
    expect(fs.existsSync(honeypotLogPath)).toBe(true);
    const logContent = fs.readFileSync(honeypotLogPath, "utf-8");
    expect(logContent).toContain(
      "Honeypot headers detected: X-Honeypot-Header-1"
    );
    logger.info("Test: Honeypot header detected and logged");
  });

  /**
   * Hook that runs once after all tests in the suite.
   *
   * @function
   * @name afterAll
   * @param {Function} callback - Async callback function to tear down the test environment.
   */
  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        logger.info("Server closed after tests");
        resolve();
      });
    });
  });
});
