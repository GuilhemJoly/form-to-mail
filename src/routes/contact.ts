/**
 * @file /C:/Users/guilh/OneDrive/Bureau/Projets/contact-API/src/routes/contact.ts
 * @description This file defines the route for sending contact emails using Express and Nodemailer.
 */

import express from "express";
import nodemailer from "../config/nodemailer";
import validateRequest from "../middlewares/validateRequest";

/**
 * The Express router for the contact route.
 */
const router = express.Router();

/** * POST /send * @summary Sends an email with the contact form details.
 * @param {string} req.body.firstname - The first name of the sender.
 * @param {string} req.body.lastname - The last name of the sender.
 * @param {string} req.body.email - The email address of the sender.
 * @param {string} req.body.subject - The subject of the email.
 * @param {string} req.body.message - The message content of the email.
 * @returns {Object} 200 - Email sent successfully.
 * @returns {Object} 500 - Error sending email or email configuration not set.
 */
router.post("/send", validateRequest, async (req, res) => {
  const { firstname, lastname, email, subject, message } = req.body;

  if (!process.env.EMAIL) {
    return res.status(500).json({
      error: "Error: destination email address is not configured.",
    });
  }

  let mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject,
    text: `Firstname: ${firstname}\nLastname: ${lastname}\nEmail: ${email}\nMessage: ${message}`,
  };

  nodemailer.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending email." });
    }
    res.status(200).send({ message: "Email sent: " + info.response });
  });
});

export default router;
