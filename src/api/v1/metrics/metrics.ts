import client from "prom-client";

// Tracks how many HTTP requests have occurred
export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// Tracks how long requests take
export const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5], // Keeps track of which requests finished under each count
});

// Tracks how many HTTP requests are currently in progress
export const httpRequestsInProgress = new client.Gauge({
  name: "http_requests_in_progress",
  help: "Number of in-progress HTTP requests",
  labelNames: ["method", "route"],
});

export const register = client.register;