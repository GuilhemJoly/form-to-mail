// #region Documentation
/**
 * @fileoverview Configuration for rate limiting middleware using `express-rate-limit`.
 * 
 * This module sets up a rate limiter to control the number of requests a client can make
 * to the API within a specified time window.
 * 
 * @module limiter
 */

 /**
  * Rate limiter middleware configuration.
  * 
  * Limits each IP to 100 requests per 15 minutes.
  * 
  * @constant
  * @type {import('express-rate-limit').RateLimit}
  * @default
  * @property {number} windowMs - Time window in milliseconds (15 minutes).
  * @property {number} max - Maximum number of requests allowed per windowMs.
  * @property {string} message - Message sent to clients when rate limit is exceeded.
  */
 // #endregion
 
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, please try again later.',
});

export default limiter;
