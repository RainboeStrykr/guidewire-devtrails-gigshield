# Product Requirements Document (PRD) — GigShield

## 1. Product Overview

**GigShield** is an AI-Powered Parametric Income Insurance product designed specifically for Q-Commerce delivery partners. Its goal is to provide a safety net for fast-delivery gig workers whose wages are heavily dependent on time and volume, and whose income is impacted by external disruptions like severe weather, curfews, or dangerous air quality.

**Vision:** To offer transparent, automated, and instant income protection for delivery partners without the bureaucratic hassle of traditional insurance claims.

## 2. Target Audience & Personas

- **Primary Users:** Q-Commerce Delivery Partners (Riders for Zepto, Blinkit, Swiggy Instamart)
- **Geography (Phase 1):** Indian Metro cities (Chennai, Bengaluru, Mumbai, Delhi, Hyderabad)
- **Why Q-Commerce?**
  - Hyperlocal dark-store zones allow precise risk modeling.
  - 10-minute SLAs mean any delay (like 30 minutes of rain) causes direct and calculable income loss.
  - Higher delivery frequencies (10–20/shift) make disruption tracking measurable.

## 3. Problem Statement

Gig delivery partners operate on tight margins where lost time directly equals lost wages. Traditional insurance doesn't cover hourly revenue drops due to heavy rain, extreme heat, severe AQI, or civil disruptions. Riders bear the full brunt of these disruptions with zero compensation.

### Scenarios

- **The Monsoon Shutdown:** Red alert heavy rainfall pauses platform operations. Rider loses hours of earning potential. *GigShield auto-triggers a payout for the lost hours.*
- **The AQI Day:** Severe smog (AQI > 400) stops outdoor work. *GigShield compensates based on the rider's average shift earning rate.*
- **The Sudden Curfew:** Section 144 prevents access to delivery zones. *GigShield triggers coverage for the blocked duration.*

## 4. Functional Requirements

### 4.1. Worker Onboarding & Risk Profiling

- **User Input:** Onboarding requires linking platform identity, operating zone (pin code), declared weekly hours, and UPI ID.
- **Risk Score Generation:** System computes initial zone risk using historical weather and disruption data, adjusted dynamically over time based on claim history and platform activity.

### 4.2. Premium Structure & Payment

- **Weekly Cycles:** Premium is priced and deducted weekly to match a rider's earning cycle.
- **Tiers:** Basic (₹29/week up to 4hrs), Standard (₹49/week up to 6hrs), Pro (₹79/week up to 10hrs).
- **Dynamic Pricing Engine:** AI adjusts premiums based on localized flood risks, IMD forecast, AQI trends, and the rider's fraud/reliability score.
- **Collection:** Auto-debit via UPI or digital wallet.

### 4.3. Disruption Monitoring & Parametric Triggers

- Automatic, human-less threshold monitoring using 3rd party APIs.
- **Triggers:**
  - *Heavy Rainfall:* > 20mm/hr sustained for 30+ min (Source: IMD API)
  - *Extreme Heat:* > 43°C during active shift (Source: IMD API)
  - *Severe AQI:* AQI > 350 (Source: CPCB / OpenAQ)
  - *Flash Flood:* Local Government alert for specific pin code
  - *Curfew:* Government advisory scraper for Section 144

### 4.4. Claim Automation & Payouts

- **Zero-Friction Initiation:** When a trigger fires for a covered zone, claims are automatically initiated.
- **Validation:** No manual review required, but cross-checked via anti-fraud measures.
- **Instant Payout:** Disbursed immediately to the linked UPI account.

### 4.5. Fraud Detection and Mitigation

- **GPS Spoofing Check:** Ensures rider is within 2km of their declared zone during the event.
- **Platform Verification:** Checks if the rider completed deliveries during the claimed "disrupted" window (which invalidates the claim).
- **Deduplication:** Hash-based checks for Rider ID + Event + Time.
- **Anomaly Detection:** ML-powered (Isolation Forest) scoring for unusual claim spikes.

## 5. Technical Requirements

### 5.1. Tech Stack

- **Frontend:** React.js, Tailwind CSS (Mobile-responsive, PWA)
- **Backend:** Node.js, Express, PostgreSQL
- **Queue/Real-Time:** Redis + Bull queue (Session & Event management)
- **AI/ML Service:** Python (FastAPI), scikit-learn, XGBoost

### 5.2. API Integrations

- IMD Public Feed / OpenWeatherMap
- CPCB / OpenAQ
- Razorpay Sandbox (for simulated payouts)
- Mock Platform API (simulated Zepto/Blinkit feed)

## 6. Development Phasing

### Phase 1: Ideation & Architecture

- Persona and use case definitions
- Tech stack finalization
- DB Schema design

### Phase 2: Core Build (MVP)

- React onboarding flow
- Static / Rule-based risk profiling
- Basic parametric trigger monitoring (weather + AQI)
- Automated claim triggering and duplication check
- Payout simulation via Razorpay test mode

### Phase 3: Scale & Intelligence

- Full ML inference for dynamic pricing (XGBoost)
- Advanced fraud detection (Isolation Forest)
- Interactive analytics dashboards for riders and admin

## 7. Success Metrics

- **Adoption:** Number of Q-commerce riders onboarded.
- **Engagement:** Retention rate on weekly premium auto-renewals.
- **Efficiency:** Claim processing speed (Target: < 5 minutes).
- **Accuracy:** False-positive claim rejection rate / Fraud capture rate.
