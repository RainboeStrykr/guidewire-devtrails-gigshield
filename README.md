# GigShield — AI-Powered Parametric Income Insurance for Q-Commerce Delivery Partners

[Understand the concept](https://youtu.be/6pQlBcXY8zM)

[How the frontend will work](https://youtu.be/DY9rxCEqB-Q)

---

## The Problem

India's Q-Commerce delivery partners and their riders fulfilling 10-minute delivery promises for Zepto, Blinkit, and Swiggy Instamart operate under extreme time pressure in hyperlocal zones. Their entire income model is built on delivery volume per hour. When external disruptions, like heavy rain, extreme heat, curfews, severe AQI, hit, they cannot ride, cannot earn, and have no safety net.

A Blinkit rider in Chennai earning ₹700/day incurs a loss of ₹87.50 per hour of disruption. Over a monsoon week, that's ₹600–₹900 in lost revenue. No insurer covers it. No platform compensates for it. The rider absorbs it entirely.

**GigShield** solves this.

---

## Persona

**Target Segment:** Grocery / Q-Commerce Delivery Partners  
**Platforms covered:** Zepto, Blinkit, Swiggy Instamart  
**Geography (Phase 1 focus):** Metro cities with active Q-commerce operations — Chennai, Bengaluru, Mumbai, Delhi, Hyderabad

### Why Q-Commerce specifically?

Q-commerce riders are the most disruption-vulnerable segment in gig delivery:

- **10-minute SLA pressure** means even a 30-minute rainfall event = 3 missed deliveries = direct, calculable income loss
- **Hyperlocal dark store zones** allow precise, zone-specific risk modelling (a rider in Velachery faces different flood risk than one in Anna Nagar)
- **Dense urban operation** makes GPS-based activity validation and fraud detection more reliable
- **Higher delivery frequency** (10–20 deliveries/shift) vs food delivery (4–8) means disruption impact is more granular and measurable

---

## Persona Scenarios

### Scenario A — The Monsoon Shutdown
Rajan, a Blinkit rider in Bengaluru, works 10 AM–8 PM daily. On a Tuesday, the IMD issues a Red alert for Bengaluru South. Rainfall exceeds 25mm/hr for 3 hours. Blinkit pauses operations in its zone. He loses 3 hours × ₹70/hr = ₹210.

**GigShield response:** Weather trigger fires automatically. Claim initiated. ₹210 transferred to his UPI ID within minutes. Zero action required from Rajan.

### Scenario B — The AQI Day
Priya, a Zepto rider in Delhi, cannot work during a severe smog episode. AQI crosses 400. The Delhi government issues an outdoor work advisory. She loses a 6-hour shift.

**GigShield response:** AQI trigger crosses threshold. Policy active. Payout calculated based on her declared weekly hours and average earning rate. Instant transfer.

### Scenario C — The Sudden Curfew
Mohammed, a Swiggy Instamart rider in Hyderabad, encounters a Section 144 curfew declared in his delivery zone following a local incident. He is unable to access pickup or drop zones for 4 hours.

**GigShield response:** Curfew/social disruption trigger (cross-referenced with government advisory APIs) fires. Income covered for the blocked hours.

---

## Application Workflow

```
[Worker Onboarding]
        ↓
[Risk Profiling — Zone + Platform + Hours + Claim History]
        ↓
[Weekly Policy Issued — Dynamic Premium Set]
        ↓
[Real-Time Disruption Monitoring — Weather / AQI / Social APIs]
        ↓
[Parametric Trigger Fired — Threshold Crossed]
        ↓
[Fraud Validation — GPS Check + Activity Cross-Reference]
        ↓
[Auto-Claim Approved — Payout Initiated via UPI/Wallet]
        ↓
[Worker Dashboard Updated — Income Protected Record]
```

---

## Weekly Premium Model

Gig workers operate on weekly earning cycles. A monthly premium is misaligned with how they think about money. GigShield prices weekly.

### Base Premium Structure

| Coverage Tier | Weekly Premium | Max Payout/Week | Coverage Hours/Day |
|---|---|---|---|
| Basic | ₹29 | ₹500 | 4 hrs |
| Standard | ₹49 | ₹900 | 6 hrs |
| Pro | ₹79 | ₹1,500 | 10 hrs |

### Dynamic Pricing Factors (AI-Adjusted Weekly)

The weekly premium is not static. It adjusts each Monday based on:

| Factor | Impact |
|---|---|
| Zone flood/waterlogging history | +/- ₹5–15 |
| IMD 7-day forecast for rider's zone | +/- ₹3–12 |
| Rider's claim history (fraud score) | +/- ₹2–10 |
| Platform activity consistency | -₹2 to -₹5 (loyalty discount) |
| AQI seasonal trends | +/- ₹2–8 |

**Example:** A Zepto rider in a low-flood-risk zone in Chennai during summer may pay ₹39/week for Standard. The same rider during northeast monsoon season in a waterlogging-prone zone may pay ₹61/week.

Premium is collected automatically each Monday via UPI auto-debit or wallet deduction — aligned to when platforms typically release weekly earnings.

---

## Parametric Triggers

These are objective, third-party verifiable thresholds. No human adjudication required.

| Trigger | Source | Threshold | Coverage |
|---|---|---|---|
| Heavy Rainfall | IMD API | > 20mm/hr sustained 30+ min | Per-hour income |
| Extreme Heat | IMD API | Temperature > 43°C during active hours | Per-hour income |
| Severe AQI | CPCB / OpenAQ API | AQI > 350 (Severe category) | Per-shift income |
| Flash Flood / Zone Closure | IMD Flood Watch + Local Gov. | Active flood alert in rider's pin code | Per-hour income |
| Section 144 / Curfew | Government advisory scraper | Curfew declared in rider's active zone | Duration of curfew |

**Coverage exclusions (hard rules):**
- Vehicle breakdown or repair costs — NOT covered
- Health or accident claims — NOT covered
- Income loss due to personal reasons — NOT covered

---

## Tech Stack

### Frontend
- **Next.js 15 (App Router)** — Rider-facing web app (responsive for mobile browsers, PWA-ready)
- **Clerk** — Authentication and user management
- **Lucide React** for icons
- **Vanilla CSS** for styling

### Backend
- **Node.js + Fastify** — REST API server
- **Supabase (PostgreSQL)** — Primary database (riders, policies, trigger alerts, claims)
- **Axios** — HTTP client for external API calls

### AI/ML
- **Python microservice (FastAPI)** — Hosts premium calculation model and fraud detection logic (Planned)
- **scikit-learn / XGBoost** — Model training and inference (Planned)
- **Called from Node.js backend** via internal HTTP

### External Integrations (Free Tiers / Mocks)
- **OpenWeatherMap API** — Real-time weather and rainfall data (free tier)
- **OpenAQ API** — Real-time AQI data by city/coordinates (free, open source)
- **IMD Public Feed** — Supplementary weather alerts (scraped/mocked)
- **Razorpay Test Mode** — Simulated premium collection and payout (sandbox)
- **Mock Platform API** — Simulated Zepto/Blinkit activity feed (built in-house)

### Infrastructure
- **Docker + Docker Compose** — Containerised local development and deployment
- **GitHub** — Version control and CI

---

## Documentation

- [Architecture & API Reference](docs/architecture.md) — system design, DB schema, API endpoints, trigger flow, and local setup
- [Product Requirements Document](docs/PRD.md) — full product spec, functional requirements, personas, and success metrics

---

## Why GigShield

**Zero-friction for the worker.** A Zepto rider earns ₹700/day. They will not navigate a 10-step claims portal. GigShield requires zero action from the rider when a trigger fires — the payout happens before they even know the claim was processed.

**Hyperlocal precision.** Broad city-level weather data is insufficient. A rainstorm in Mylapore doesn't ground a rider in Adyar. GigShield resolves triggers at pin code level, not city level.

**Weekly pricing matches real earning psychology.** Gig workers think in weekly cycles because platforms pay weekly. A ₹49/week premium is a decision they can make every Monday — not a ₹200/month commitment they have to commit to in advance.

**Parametric = no disputes.** Traditional insurance requires proof, adjudication, and waiting. Parametric insurance runs on objective data. If the API says it rained 25mm/hr in your zone, you get paid. No call centers. No claim rejection ambiguity.

---

## Repository Structure

```
gigshield/
├── frontend/                    # Next.js 15 frontend (App Router)
│   ├── app/
│   │   ├── onboarding/          # Worker onboarding flow
│   │   ├── dashboard/           # Rider dashboard
│   │   ├── claims/              # Claims view
│   │   ├── policy/              # Policy details
│   │   ├── mycoverage/          # Coverage summary
│   │   ├── trigger/             # Trigger monitoring view
│   │   ├── sign-in/             # Clerk sign-in
│   │   ├── sign-up/             # Clerk sign-up
│   │   └── components/          # Shared UI components (Header, etc.)
│   └── middleware.js            # Clerk auth middleware
├── backend/                     # Node.js + Fastify backend
│   ├── routes/                  # Fastify API routes (riders, policies, triggers)
│   ├── controllers/             # Request handling logic
│   ├── lib/                     # Supabase client
│   ├── db/                      # SQL schema files
│   └── index.js                 # Server entry point
├── ml-service/                  # Python FastAPI microservice (Planned)
│   ├── pricing_model/           # XGBoost premium calculator
│   └── fraud_model/             # Isolation Forest fraud scorer
├── docs/                        # Architecture diagrams, PRD
├── docker-compose.yml           # Multi-service container orchestration
└── README.md
```

---

## Team

- Abhiraj Bhowmick
- Anik Das
- Sourish Ghosh
- Yashi Ghosh

---

*GigShield — Because the rider who delivers your groceries in the rain deserves to be covered for it.*
