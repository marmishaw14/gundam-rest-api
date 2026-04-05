import express, { Express } from "express";
import dotenv from "dotenv";

// Environment variables loaded before internal imports
dotenv.config();
import morgan from "morgan";
import mobileSuitRoutes from "./api/v1/routes/mobileSuitRoutes";


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
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Define health check route
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.use("/api/v1", mobileSuitRoutes);

export default app;