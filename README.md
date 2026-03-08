# 🛵 GigShield — AI-Powered Parametric Income Insurance for Food Delivery Partners

> **Guidewire DEVTrails 2026 | Phase 1 Submission**  
> Protecting the livelihoods of Zomato & Swiggy delivery partners from uncontrollable income disruptions.

---

## 🎯 The Problem

Food delivery partners on Zomato and Swiggy earn ₹15,000–₹25,000/month, but their income is entirely dependent on being able to ride. When a cyclone hits Chennai, a flood waterlog's Mumbai streets, or a sudden curfew locks down a zone — they lose an entire day's wages with zero safety net.

These workers have no financial cushion. No insurance. No fallback. Just zero orders and zero income.

**GigShield** changes that. We don't wait for the worker to file a claim. We watch the world, and when it disrupts their work, we pay them automatically.

---

## 👤 Persona — Field Research with Swiggy Delivery Partners

To ground GigShield in reality, our team conducted direct interviews with active Swiggy delivery partners across three locations — covering rural, suburban, and urban delivery contexts.

---

### 📍 Kollam, Kerala — Rural & Suburban Perspective

Kollam represents smaller-town delivery operations where order density is lower and disruptions hit harder proportionally.

| Detail | Finding |
|--------|---------|
| Avg. weekly earnings | ₹2,500–₹3,500 |
| Working hours | 9–11 hrs/day, 6 days/week |
| Primary disruptions reported | Kerala monsoon (June–September), hartals, temple festival processions closing roads, local bandhs |
| Biggest concern | Hartals (state/district-level strikes) declared with little notice — can wipe out an entire day with no warning |
| Secondary concern | Monsoon flooding of interior roads — delivery zones become unreachable even if the worker is willing to ride |
| Financial safety net | None. Most workers live order-to-order. A hartal day = skipped meals for the family |
| Insurance awareness | Very low — most had never considered income insurance existed |
| Preferred payout method | UPI (GPay/PhonePe) — all workers had it, found it trustworthy |

> *"When hartal is announced at night, by morning I have already lost the whole day. Nobody compensates me."* — Swiggy partner, Kollam

---

### 📍 Kochi, Kerala — Semi-Urban Perspective

Kochi sits between Kollam and Bangalore — a growing metro with higher order volume but acute flooding and traffic sensitivity.

| Detail | Finding |
|--------|---------|
| Avg. weekly earnings | ₹4,000–₹5,500 |
| Working hours | 10–12 hrs/day |
| Primary disruptions reported | Waterlogging (Edappally, Vytilla junctions flood every heavy rain), political hartals, public holidays with restaurant closures |
| Biggest concern | Flash waterlogging — roads flood within 30 minutes of heavy rain, making zones completely inaccessible mid-shift |
| Secondary concern | Public holidays (Onam, Vishu, Eid) — restaurants close, orders collapse, but the worker is still available and loses a full day's income |
| Financial safety net | 2 out of 5 workers interviewed had taken informal loans to cover lean weeks |
| Key insight | Workers are more digitally aware here — willing to use an app but need it to be in Malayalam or simple English |

> *"On Onam, I sit home. Swiggy has no orders. I lose ₹800 that day. This happens every big holiday."* — Swiggy partner, Kochi

---

### 📍 Bengaluru, Karnataka — Urban Perspective

Bengaluru represents the high-volume, high-competition urban delivery market with distinct disruption patterns.

| Detail | Finding |
|--------|---------|
| Avg. weekly earnings | ₹5,000–₹7,000 |
| Working hours | 10–14 hrs/day, often 7 days/week |
| Primary disruptions reported | Extreme heat (April–May), heavy rain (Sep–Nov), bandhs/political protests, tech park zone shutdowns |
| Biggest concern | Unseasonal rain during peak dinner hours (7–10 PM) — orders spike but workers physically cannot ride safely, so they go offline and earn nothing |
| Secondary concern | Bandhs with very short notice — police stop bikes on road, workers have no choice but to return home |
| Financial safety net | Slightly better — a few workers had savings for 1–2 weeks, but most were still paycheck-to-paycheck |
| Key insight | Urban workers are more aware of the insurance concept but frustrated that existing products cover health/accidents, not the actual income disruption they face daily |

> *"There is insurance for bike damage, insurance for hospital. But when rain stops me from working, nobody gives me anything."* — Swiggy partner, Bengaluru

---

### 🔍 Cross-Location Insights

| Theme | Rural (Kollam) | Semi-Urban (Kochi) | Urban (Bengaluru) |
|-------|---------------|-------------------|-------------------|
| Top disruption | Hartals | Waterlogging + Holidays | Rain during peak hours + Bandhs |
| Financial cushion | None | Minimal | Minimal |
| Insurance awareness | Very low | Low | Low-Medium |
| Preferred payout | UPI instant | UPI instant | UPI instant |
| Premium willingness | ₹20–35/week | ₹35–55/week | ₹50–80/week |

**Key takeaway:** Across all three locations, workers lose income not from health issues or accidents — but from the world outside stopping them: weather, strikes, holidays, and flooded roads. These are predictable, measurable, external events — exactly what parametric insurance is designed to cover.

---

## 🔄 Application Workflow

```
1. ONBOARDING
   Worker signs up → verifies platform ID (Zomato/Swiggy partner ID) →
   selects home zone → AI builds risk profile → gets a weekly premium quote

2. POLICY ACTIVATION
   Worker pays weekly premium (₹X) → coverage active for 7 days →
   system begins monitoring disruption triggers in their zone

3. REAL-TIME MONITORING
   GigShield continuously monitors: Weather APIs, AQI feeds,
   Traffic/curfew alerts, Platform uptime APIs → all mapped to worker's zone

4. AUTOMATIC CLAIM TRIGGER
   Disruption threshold crossed (e.g., rainfall > 35mm/hr) →
   System auto-checks: Was the worker supposed to be active? →
   Cross-validates with GPS/login activity → Claim auto-approved

5. INSTANT PAYOUT
   Payout calculated based on disruption severity × worker's avg hourly income →
   Transferred via UPI/wallet within minutes — no forms, no waiting

6. ANALYTICS DASHBOARD
   Worker: Weekly coverage status, earnings protected, disruption history
   Admin/Insurer: Live claims, fraud flags, risk heatmaps, loss ratios
```

---

## 💰 Weekly Premium Model

GigShield is priced **weekly** to match the gig worker's earning cycle. Premiums are debited every Monday.

### Base Premium Tiers

| Coverage Tier | Weekly Premium | Max Weekly Payout | Best For |
|---------------|----------------|-------------------|----------|
| Basic Shield  | ₹29/week       | ₹500              | New workers, low-risk zones |
| Standard Shield | ₹49/week     | ₹1,000            | Most workers |
| Pro Shield    | ₹79/week       | ₹2,000            | High earners, high-risk zones |

### AI-Driven Dynamic Pricing

The base premium is **dynamically adjusted** each week by our ML model using:

| Factor | Effect on Premium |
|--------|-------------------|
| Worker's zone historical flood/rain risk | ±15% |
| Forecasted weather for next 7 days | ±20% |
| Worker's average daily active hours | Adjusts payout baseline |
| City-level disruption history (last 90 days) | ±10% |
| Worker's claim history (fraud score) | ±10% |

> **Example:** Ravi operates in Koramangala (Bengaluru) — historically safe from flooding but high AQI risk. His Standard Shield premium is adjusted from ₹49 → ₹44/week (zone discount). During peak monsoon forecast week, it adjusts to ₹52/week to reflect higher risk.

---

## ⚡ Parametric Triggers

Payouts are **automatic** — no claim form needed. Triggers are objective, verifiable, and sourced from third-party APIs.

| Trigger | Threshold | Payout |
|---------|-----------|--------|
| Heavy Rainfall | > 35mm/hr in worker's zone | 50–100% of daily avg income |
| Extreme Heat + AQI | Temp > 42°C AND AQI > 300 | 50% of daily avg income |
| Flash Flood / Waterlogging | IMD flood alert in pincode | 100% of daily avg income |
| Civic Curfew / Strike | Official advisory in zone | 100% of daily avg income |
| Platform Outage | Zomato/Swiggy API down > 2hrs during peak | 40% of peak-hour income |

> Workers are only eligible for payouts on days their app status shows them as "online/active" before the disruption — preventing cold abuse.

---

## 🤖 AI/ML Integration Plan

This is where GigShield stands out. We use ML at every layer:

### 1. Dynamic Premium Calculation (Random Forest / XGBoost)
- **Inputs:** Zone risk index, 7-day weather forecast, historical claim frequency, worker tenure and earnings profile
- **Output:** Personalized weekly premium with explainable pricing breakdown
- **Training Data:** IMD historical weather data, SAFAR AQI datasets, synthetic claim data

### 2. Predictive Risk Modeling (LSTM Time-Series)
- Forecasts disruption probability by zone for the coming week
- Feeds into premium adjustment and insurer's risk dashboard
- Helps insurer pre-allocate payout reserves

### 3. Fraud Detection (Isolation Forest + Rule Engine)
- **Anomaly signals:** GPS location mismatch, claiming from a zone never worked in, multiple claims on same disruption event from same device, sudden spike in claims from a cluster of workers in one area
- **GPS Spoofing Detection:** Cross-references reported location with cell tower data and order history
- **Duplicate Claim Prevention:** Event deduplication — one payout per disruption window per worker

### 4. Payout Calibration (Regression Model)
- Calculates fair payout amount based on: disruption duration, severity level, worker's typical earnings in that time window
- Avoids both under-paying and over-paying

---

## 🖥️ Platform Choice — Web (PWA)

We chose a **Progressive Web App (PWA)** over a native mobile app because:
- No App Store dependency — critical for low-storage devices common among delivery workers
- Works offline-first — important in low-connectivity zones during a storm
- Single codebase for worker-facing and insurer-facing dashboards
- Shareable via WhatsApp link — aligns with how gig workers discover services

---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | React.js (PWA) | Fast, offline-capable, mobile-responsive |
| Backend | FastAPI (Python) | Async, lightweight, ML-native |
| ML Models | scikit-learn, XGBoost, TensorFlow | Premium calc, fraud detection, risk forecasting |
| Database | PostgreSQL + Redis | Relational for policies/claims, Redis for real-time event caching |
| Weather API | OpenWeatherMap (free tier) / IMD mock | Trigger monitoring |
| AQI API | WAQI API (free tier) | Heat + pollution triggers |
| Payment | Razorpay test mode / UPI sandbox | Weekly premium debit + instant payout simulation |
| Maps | Leaflet.js + OpenStreetMap | Zone mapping, risk heatmaps |
| Auth | Firebase Auth (phone OTP) | Gig worker-friendly login |
| Hosting | Railway / Render (free tier) | Fast deployment, no infra overhead |

---

## 📅 Development Plan

### Phase 1 (March 4–20): Foundation ✅
- [x] Problem scoping and persona definition
- [x] Tech stack finalization
- [x] README and strategy document
- [ ] Basic worker onboarding UI (mockup)
- [ ] ML model design and dataset identification

### Phase 2 (March 21–April 4): Core Build
- Worker registration + policy creation flow
- Dynamic weekly premium calculator (ML model v1)
- 3–5 parametric triggers wired to mock/real APIs
- Claims management dashboard
- Basic fraud detection rules

### Phase 3 (April 5–17): Scale & Polish
- Advanced fraud detection (Isolation Forest, GPS spoof detection)
- Simulated UPI payout flow (Razorpay sandbox)
- Dual dashboard: Worker + Insurer/Admin
- Predictive analytics for next-week risk
- Final demo video + pitch deck

---

## 📁 Repository Structure

```
gigshield/
├── frontend/          # React PWA — worker & admin dashboards
├── backend/           # FastAPI — policy, claims, trigger engine
├── ml/                # Model training, feature engineering, inference
├── data/              # Mock datasets, synthetic claim data
├── docs/              # Architecture diagrams, API specs
└── README.md
```

---

## ✅ What GigShield Covers vs. Does NOT Cover

### Covered — Income lost due to external, verifiable disruptions:
- ✅ Heavy rain, floods, or waterlogging making zones inaccessible
- ✅ Extreme heat or hazardous AQI levels preventing outdoor work
- ✅ Hartals, bandhs, or political strikes (state/district/local level)
- ✅ Public holidays causing restaurant closures and order collapse (Onam, Diwali, Eid, etc.)
- ✅ Curfews or government-mandated zone shutdowns
- ✅ Natural disasters (cyclone warnings, IMD red alerts)

### NOT Covered — by design and regulatory constraint:
- ❌ Health issues, illness, or hospitalization
- ❌ Accidents or physical injury
- ❌ Vehicle breakdown or repair costs
- ❌ Personal liability or third-party damage

> GigShield is not a health product or a vehicle product. It is purely an **income continuity** product — we pay the worker the wages they would have earned, when the outside world prevents them from earning it. The trigger is always an external, measurable event — never a personal one.

---

## 👥 Team

| Name | Role |
|------|------|
| [Member 1] | ML Engineer — Premium model & fraud detection |
| [Member 2] | Backend Engineer — API & trigger engine |
| [Member 3] | Frontend Engineer — PWA & dashboards |
| [Member 4] | Full-stack + DevOps |
| [Member 5] | Product & Domain research |

---

*Built for Guidewire DEVTrails 2026 | Theme: Seed → Scale → Soar*
