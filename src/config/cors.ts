// #region Documentation
/**
 * @fileoverview Configuration for CORS middleware.
 * 
 * This module sets up the CORS middleware with specific options to handle
 * cross-origin requests. The configuration includes allowed origins, methods,
 * and headers.
 * 
 * @module config/cors
 */

 /**
  * CORS options configuration object.
  * 
  * @property {boolean} credentials - Indicates whether or not the response to the request can be exposed when the credentials flag is true.
  * @property {string} origin - Specifies the origin that is allowed to access the resource.
  * @property {string} methods - Specifies the HTTP methods that are allowed when accessing the resource.
  * @property {string[]} allowedHeaders - Specifies the headers that are allowed when making a request to the resource.
  */
  // #endregion
  
import cors from "cors";

const corsOptions = {
  credentials: true,
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
    "Authorization",
    "X-Honeypot-Header-1",
    "X-Honeypot-Header-2",
  ],
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
