// #region Documentation
/**
 * Middleware to validate the request body for required fields.
 *
 * This middleware checks if the request body contains the following fields:
 * - `firstname`: The first name of the user.
 * - `lastname`: The last name of the user.
 * - `email`: The email address of the user.
 * - `subject`: The subject of the message.
 * - `message`: The content of the message.
 *
 * If any of these fields are missing, it logs a warning and sends a 400 status response
 * with the message "Tous les champs sont requis." (All fields are required).
 * If all fields are present, it logs that the validation passed and calls the `next` middleware.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
// #endregion
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { firstname, lastname, email, subject, message } = req.body as {
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    message: string;
  };

  if (!firstname || !lastname || !email || !subject || !message) {
    logger.warn("Validation failed: Missing fields in request");
    res.status(400).send("Tous les champs sont requis.");
    return;
  }
  console.log("Request body:", req.body);
  logger.info("Validation passed");
  next();
};

export default validateRequest;
