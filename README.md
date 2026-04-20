# Gundam Artillery and Combat Operations Management API

Production-style TypeScript/Express API for managing Gundam combat operations:
- pilots
- mobile suits
- weapons
- missions
- admin claim management

The API uses Firebase Admin (Auth + Firestore), request validation with Joi, centralized error handling, route-level authorization, Prometheus metrics, and OpenAPI documentation.

## Tech Stack

- Node.js + TypeScript
- Express 5
- Firebase Admin SDK (Authentication + Firestore)
- Joi validation
- Helmet security headers
- CORS middleware
- Swagger/OpenAPI (`swagger-jsdoc`, `swagger-ui-express`)
- Jest + Supertest
- Prometheus client metrics

## Project Status

This project is functionally complete for the capstone scope and includes:
- CRUD APIs for pilots, mobile suits, weapons, and missions
- Firebase bearer token authentication
- role-based authorization middleware
- admin endpoint for custom claims management
- generated OpenAPI docs and static docs output
- metrics and health endpoints

## API Base and Docs

- Base URL (local): `http://localhost:3010`
- Swagger UI: `http://localhost:3010/api-docs`
- Health check: `GET /api/v1/health`
- Metrics: `GET /metrics`

## Environment Variables

Create a `.env` file based on `.env.example`.

```bash
cp .env.example .env
```

The following variables are required (from `.env.example`):

| Variable | Description |
|---|---|
| `NODE_ENV` | Runtime environment (`development` or `production`) |
| `PORT` | API server port |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account client email |
| `SWAGGER_SERVER_URL` | URL used for generated docs context |
| `CLOUDFLARE_TUNNEL_TOKEN` | Token if exposing API through Cloudflare tunnel |

## Installation

```bash
npm install
```

## Run the Project

Development:

```bash
npm start
```

Build:

```bash
npm run build
```

Production run (after build):

```bash
npm run start:prod
```

## Deploy with Docker + Cloudflare Tunnel

This repository includes a `docker-compose.yml` with:
- `api` (Node/TypeScript API)
- `cloudflared` (Cloudflare Tunnel agent)
- `prometheus`
- `grafana`

### Prerequisites

- Docker + Docker Compose installed
- A Cloudflare account
- A domain managed in Cloudflare
- A Cloudflare Tunnel token

### 1. Prepare Environment Variables

Copy and edit the environment file:

```bash
cp .env.example .env
```

Set all required Firebase values and set:

- `NODE_ENV=production`
- `PORT=3010`
- `SWAGGER_SERVER_URL` to your public API URL (for example `https://api.yourdomain.com`)
- `CLOUDFLARE_TUNNEL_TOKEN` to your Cloudflare tunnel token

### 2. Create Tunnel in Cloudflare

In Cloudflare Zero Trust:

1. Create a tunnel (Cloudflared connector).
2. Add a Public Hostname (for example `api.yourdomain.com`).
3. Set the service target to `http://api:3010` (the API service name and port from Docker Compose).
4. Copy the generated tunnel token into `.env` as `CLOUDFLARE_TUNNEL_TOKEN`.

### 3. Build and Start Containers

```bash
docker compose up -d --build
```

Check running services:

```bash
docker compose ps
```

View logs if needed:

```bash
docker compose logs -f api cloudflared
```

### 4. Verify Deployment

- Local API: `http://localhost:3010/api/v1/health`
- Public API (through tunnel): `https://api.yourdomain.com/api/v1/health`
- Local Swagger UI: `http://localhost:3010/api-docs`
- Metrics: `http://localhost:3010/metrics`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001`

### 5. Stop or Restart

Stop:

```bash
docker compose down
```

Restart:

```bash
docker compose restart
```

## Scripts

| Script | Purpose |
|---|---|
| `npm start` | Run API with `ts-node` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start:prod` | Run compiled output |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run generate-docs` | Generate `openapi.json` and static docs at `docs/index.html` |

## Authentication and Authorization

All domain routes are protected by Firebase bearer token auth and role checks.

Implemented roles used by middleware:
- `admin`
- `commander`
- `pilot`

Role access by resource:

| Route Group | Read | Create/Update/Delete |
|---|---|---|
| `/api/v1/mobile-suits` | `admin`, `commander`, `pilot` | `admin`, `commander` |
| `/api/v1/weapons` | list: `admin`, `commander`, `pilot`; by-id: `admin`, `commander` | `admin`, `commander` |
| `/api/v1/missions` | `admin`, `commander`, `pilot` | `admin`, `commander` |
| `/api/v1/pilots` | `admin`, `commander` | create/delete: `admin`; update: `admin`, `commander` |
| `/api/v1/admin/setCustomClaims` | `admin` | `admin` |

## Key Endpoints

### Admin
- `POST /api/v1/admin/setCustomClaims`

### Pilots
- `POST /api/v1/pilots`
- `GET /api/v1/pilots`
- `GET /api/v1/pilots/:id`
- `PUT /api/v1/pilots/:id`
- `DELETE /api/v1/pilots/:id`

### Mobile Suits
- `POST /api/v1/mobile-suits`
- `GET /api/v1/mobile-suits`
- `GET /api/v1/mobile-suits/:id`
- `PUT /api/v1/mobile-suits/:id`
- `DELETE /api/v1/mobile-suits/:id`

### Weapons
- `POST /api/v1/weapons`
- `GET /api/v1/weapons`
- `GET /api/v1/weapons/:id`
- `PUT /api/v1/weapons/:id`
- `DELETE /api/v1/weapons/:id`

### Missions
- `POST /api/v1/missions`
- `GET /api/v1/missions`
- `GET /api/v1/missions/:id`
- `PUT /api/v1/missions/:id`
- `DELETE /api/v1/missions/:id`

## Documentation Workflow

Regenerate OpenAPI and static docs:

```bash
npm run generate-docs
```

Generated outputs:
- `openapi.json`
- `docs/index.html`

## Testing

Run all tests:

```bash
npm test
```

Coverage:

```bash
npm run test:coverage
```
