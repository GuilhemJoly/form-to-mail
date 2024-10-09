// #region Documentation
/**
 * @file /c:/Users/guilh/OneDrive/Bureau/Projets/contact-API/src/config/nodemailer.ts
 * @description Configuration file for setting up Nodemailer with Gmail service.
 *
 * This module sets up a Nodemailer transporter using environment variables for authentication.
 * It uses the 'dotenv' package to load environment variables from a .env file.
 *
 * @module nodemailerConfig
 */
 // #endregion

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default transporter;
