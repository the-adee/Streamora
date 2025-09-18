// this file contains the application logic or core express application.
// setups the middleware, connects the routes, and
// configures the global error handler.
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRouter from "./routes/health.js";
import eventsRouter from "./routes/events.js";
import meRouter from "./routes/me.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// init express app
const app = express();

// security middleware
app.use(helmet());

// middleware to allow requests from frontend or client side
app.use(cors({ origin: "*" }));

// body parsers
// for parsing application/json
app.use(express.json());

//for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// request-logging
app.use(morgan("dev"));

// api routes
app.use("/health", healthRouter);
app.use("/api/events", eventsRouter);
app.use("/api/me", meRouter);

// error handling
// 404 not found handler
app.use(notFoundHandler);

// global error handler
app.use(errorHandler);

export default app;
