# GigShield Architecture

## System Overview

GigShield is a parametric income insurance platform for Q-Commerce delivery partners. The system monitors real-time environmental conditions (weather, AQI, civil disruptions) and automatically triggers payouts when predefined thresholds are crossed in a rider's active zone.

```mermaid
graph TB
    subgraph Client
        A[Next.js Frontend<br/>Rider Dashboard]
    end

    subgraph Backend
        B[Express.js API Server]
        C[Route Layer<br/>riders / policies / triggers]
        D[Controller Layer<br/>Business Logic]
        E[Mongoose Models<br/>Rider / Policy / TriggerAlert]
    end

    subgraph Data
        F[(MongoDB<br/>Primary Store)]
        G[(PostgreSQL<br/>Analytics - Future)]
        H[(Redis<br/>Session + Queue - Future)]
    end

    subgraph External
        I[OpenWeatherMap API]
        J[OpenAQ API]
        K[IMD Public Feed]
        L[Razorpay Sandbox]
    end

    A -- REST API :5001 --> B
    B --> C --> D --> E
    E --> F
    D -.-> G
    D -.-> H
    D --> I
    D --> J
    D -.-> K
    D -.-> L
```

## Directory Structure

```
gigshield/
├── backend/                # Express.js API server
│   ├── controllers/        # Request handlers (rider, policy, trigger)
│   ├── models/             # Mongoose schemas (Rider, Policy, TriggerAlert)
│   ├── routes/             # Express route definitions
│   ├── index.js            # Server entry point
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/               # Next.js 15 App Router
│   ├── app/                # Pages and layouts
│   │   ├── layout.jsx      # Root layout (metadata, global CSS)
│   │   ├── page.jsx        # Root redirect -> /login
│   │   ├── login/          # Login screen
│   │   ├── onboarding/     # Multi-step onboarding wizard
│   │   ├── dashboard/      # Main dashboard (metrics, alerts, map)
│   │   ├── trigger/        # Live trigger monitoring view
│   │   ├── policy/         # Policy details and documents
│   │   ├── claims/         # Claims history and settlement log
│   │   ├── mycoverage/     # Detailed coverage breakdown
│   │   └── components/     # Shared components (Header)
│   ├── lib/                # API service layer
│   ├── public/             # Static assets (logo, icons)
│   ├── Dockerfile
│   └── package.json
├── docs/                   # Project documentation
│   ├── architecture.md     # This file
│   └── PRD.md              # Product Requirements Document
├── docker-compose.yml      # Full-stack orchestration
├── package.json            # Root workspace scripts
└── README.md
```

## API Endpoints

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | `/api/riders/onboarding`      | Register a new rider           |
| GET    | `/api/riders/:id`             | Get rider profile by ID        |
| POST   | `/api/policies/issue`         | Issue a new weekly policy       |
| GET    | `/api/policies/:policyId`     | Get policy details             |
| GET    | `/api/triggers/alerts`        | Get latest 10 trigger alerts   |
| POST   | `/api/triggers/simulate`      | Simulate a trigger event       |

## Data Models

### Rider

| Field       | Type     | Description                     |
|-------------|----------|---------------------------------|
| name        | String   | Rider full name                 |
| phone       | String   | Phone number (unique)           |
| zone        | String   | Operating zone (pin code area)  |
| platform    | String   | Delivery platform               |
| fraudScore  | Number   | Rolling fraud score (0-100)     |

### Policy

| Field       | Type     | Description                     |
|-------------|----------|---------------------------------|
| policyId    | String   | Unique policy identifier        |
| riderId     | ObjectId | Reference to Rider              |
| tier        | Enum     | Basic / Standard / Pro          |
| premium     | Number   | Weekly premium amount            |
| maxCoverage | Number   | Maximum weekly payout            |
| status      | Enum     | Active / Expired / Cancelled    |

### TriggerAlert

| Field       | Type     | Description                     |
|-------------|----------|---------------------------------|
| zone        | String   | Affected zone                   |
| intensity   | Number   | Measured intensity value         |
| triggerType | String   | Rainfall / AQI / Heat / Curfew  |
| status      | Enum     | Active / Resolved               |

## Parametric Trigger Flow

```mermaid
sequenceDiagram
    participant W as Weather API
    participant B as Backend
    participant DB as MongoDB
    participant R as Rider App

    loop Every 5 minutes
        B->>W: Poll weather data for active zones
        W-->>B: Return conditions (rainfall, AQI, temp)
    end

    alt Threshold crossed (e.g. rainfall > 20mm/hr)
        B->>DB: Create TriggerAlert (zone, intensity, type)
        B->>DB: Find active policies in affected zone
        B->>DB: Calculate payout (hours x rate)
        B->>R: Push notification (payout initiated)
        B->>DB: Log claim and payout record
    end
```

## Running Locally

```bash
# Install all dependencies
npm run install:all

# Start both backend and frontend in dev mode
npm run dev

# Backend runs on http://localhost:5001
# Frontend runs on http://localhost:3000
```

## Running with Docker

```bash
# Build and start all services
docker compose up --build

# Stop all services
docker compose down
```
