import { Request, Response, NextFunction } from "express";
import {
  httpRequestsTotal,
  httpRequestDurationSeconds,
  httpRequestsInProgress,
} from "../metrics/metrics";

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime.bigint();

    // IMPORTANT: avoid high-cardinality routes
    const route = req.route?.path || "unmatched";
    // When request starts, increments gauge
    httpRequestsInProgress.inc({ method: req.method, route });

    res.on("finish", () => {
        const end = process.hrtime.bigint();
        // Converts nanoseconds to seconds (Prometheus standard)
        const duration = Number(end - start) / 1_000_000_000;

        const labels = {
        method: req.method,
        route,
        status_code: String(res.statusCode),
        };

        httpRequestsTotal.inc(labels);
        httpRequestDurationSeconds.observe(labels, duration);
        httpRequestsInProgress.dec({ method: req.method, route });
    });

    next();
};