import express, { Express } from "express";
import dotenv from "dotenv";

// Environment variables loaded before internal imports
dotenv.config();
import { apiHelmetConfig } from "../config/helmetConfig";
import cors from "cors";
import { getCorsOptions } from "../config/corsConfig";
import { collectDefaultMetrics, register } from "prom-client";
import { accessLogger, errorLogger, consoleLogger, } from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import mobileSuitRoutes from "./api/v1/routes/mobileSuitRoutes";
import weaponRoutes from "./api/v1/routes/weaponRoutes";
import missionRoutes from "./api/v1/routes/missionRoutes";
import pilotRoutes from "./api/v1/routes/pilotRoutes";
import setupSwagger from "../config/swagger";
import { HTTP_STATUS } from "./constants/httpConstants";
import { metricsMiddleware } from "./api/v1/middleware/metricsMiddleware";
import adminRouter from "./api/v1/routes/adminRoutes";

/**
 * Represents response structure for health check endpoint
 */
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// Initialize Express application
const app: Express = express();

// Apply Helmet security
app.use(apiHelmetConfig());
// Apply CORS config
app.use(cors(getCorsOptions()));

// Logging middleware
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

collectDefaultMetrics();
app.use(metricsMiddleware);
app.use(express.json());

app.use("/api/v1/admin", adminRouter);

// Define a route
/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - System
 *     summary: Root endpoint
 *     description: Simple root endpoint used for basic API reachability checks.
 *     responses:
 *       200:
 *         description: Root response.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello, World!
 */
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Define health check route
/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     tags:
 *       - System
 *     summary: Health check
 *     description: Returns API health status and runtime metadata.
 *     responses:
 *       200:
 *         description: Health check data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheckResponse'
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.get("/metrics", async (req, res) => {
    try{
        res.set("Content-Type", register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).end(error);
    }
});

// Define route for mobile suits
app.use("/api/v1", mobileSuitRoutes);

// Define route for weapons
app.use("/api/v1", weaponRoutes);

// Define route for missions
app.use("/api/v1", missionRoutes);

// Define route for pilots
app.use("/api/v1", pilotRoutes);

// Setup Swagger
setupSwagger(app);

// Global error handling middleware
app.use(errorHandler);

export default app;
