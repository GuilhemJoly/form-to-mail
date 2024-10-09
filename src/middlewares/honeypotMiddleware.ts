// #region Documentation
/**
 * Middleware to detect honeypot headers in incoming requests.
 *
 * This middleware checks for specific honeypot headers in the request headers.
 * If any honeypot headers are detected, it logs the detection details to a honeypot log file.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * @remarks
 * The honeypot headers being checked are "X-Honeypot-Header-1" and "X-Honeypot-Header-2".
 * If any of these headers are found, the middleware logs the detection details including
 * the IP address of the request and the current timestamp.
 *
 * The log file is located at "../config/honeypot.log". Ensure that the path is correct
 * and that the application has write permissions to this file.
 *
 * @example
 * Usage in an Express application
 * import honeypotMiddleware from './middlewares/honeypotMiddleware';
 *
 * app.use(honeypotMiddleware);
 */
// #endregion
import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import logger from "../utils/logger";

const honeypotMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const honeypotHeaders = ["X-Honeypot-Header-1", "X-Honeypot-Header-2"];
  const detectedHeaders = honeypotHeaders.filter(
    (header) =>
      (req.headers as unknown as Record<string, string | undefined>)[
        header.toLowerCase()
      ]
  );

  logger.info(`Checking for honeypot headers: ${honeypotHeaders.join(", ")}`);
  logger.info(`Detected headers: ${detectedHeaders.join(", ")}`);

  if (detectedHeaders.length > 0) {
    const logEntry = `Honeypot headers detected: ${detectedHeaders.join(
      ", "
    )} - IP: ${req.ip} - Time: ${new Date().toISOString()}\n`;
    const logFilePath = path.join(__dirname, "../config/honeypot.log");
    logger.info(`Writing to honeypot log: ${logEntry}`);
    try {
      fs.appendFileSync(logFilePath, logEntry);
      logger.info(`Successfully wrote to honeypot log: ${logFilePath}`);
    } catch (error) {
      logger.error(
        `Failed to write to honeypot log: ${(error as Error).message}`
      );
    }
  } else {
    logger.info("No honeypot headers detected");
  }

  next();
};

export default honeypotMiddleware;
