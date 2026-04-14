import express, { Express } from "express";
import dotenv from "dotenv";

// Environment variables loaded before internal imports
dotenv.config();
import morgan from "morgan";
import mobileSuitRoutes from "./api/v1/routes/mobileSuitRoutes";
import weaponRoutes from "./api/v1/routes/weaponRoutes";
import missionRoutes from "./api/v1/routes/missionRoutes";
import pilotRoutes from "./api/v1/routes/pilotRoutes";
import setupSwagger from "../config/swagger";

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

app.use(express.json());

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

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

export default app;
