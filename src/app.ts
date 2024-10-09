// #region Documentation
/**
 * @fileoverview Main application file for the contact API.
 * 
 * This file sets up the Express application, configures middleware, and defines routes.
 * 
 * @requires express
 * @requires ./config/cors
 * @requires ./config/limiter
 * @requires ./routes/contact
 * @requires ./middlewares/honeypotMiddleware
 * @requires ./middlewares/validateRequest
 */

 /**
  * Express application instance.
  * 
  * @constant
  * @type {import('express').Application}
  */

 /**
  * Middleware to enable Cross-Origin Resource Sharing (CORS).
  * 
  * @function
  * @name cors
  * @memberof module:config/cors
  */

 /**
  * Middleware to limit repeated requests to public APIs.
  * 
  * @function
  * @name limiter
  * @memberof module:config/limiter
  */

  /**
  * Middleware to detect honeypot headers in requests.
  * 
  * @function
  * @name honeypotMiddleware
  * @memberof module:middlewares/honeypotMiddleware
  */

   /**
  * Middleware to validate the request body for required fields.
  * 
  * @function
  * @name validateRequest
  * @memberof module:middlewares/validateRequest
  */

 /**
  * Routes for handling contact-related requests.
  * 
  * @name contactRoutes
  * @memberof module:routes/contact
  */

 /**
  * POST /api/test
  * 
  * Test endpoint to verify that the server is receiving POST requests.
  * 
  * @name /api/test
  * @function
  * @memberof module:app
  * @param {import('express').Request} req - Express request object.
  * @param {import('express').Response} res - Express response object.
  * @returns {void}
  */
 // #endregion
 
 import express from "express";
 import cors from "./config/cors";
 import limiter from "./config/limiter";
 import contactRoutes from "./routes/contact";
 import honeypotMiddleware from "./middlewares/honeypotMiddleware";
 import validateRequest from "./middlewares/validateRequest";
 
 const app = express();
 
 app.use(cors);
 app.use(honeypotMiddleware);
 app.use(express.json());
 app.use(limiter);
 app.use("/api", validateRequest, contactRoutes);
 
 app.post("/api/test", validateRequest, (req, res) => {
   res.status(200).json({ message: 'POST request received' });
 });
 
 export default app;
 