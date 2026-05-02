import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const GUIDE_CONTENT = `
================================================================================
  DUTYBOOST — FULL STACK DEVELOPMENT WIREFRAME & MIGRATION GUIDE
  For implementation outside Base44 (e.g. AWS)
  Version 1.0 | Prepared for internal engineering use
================================================================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE OF CONTENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1.  System Overview
  2.  Technology Stack Recommendation (AWS)
  3.  Database Schema (all entities)
  4.  Authentication Architecture
  5.  Backend API Design (REST)
  6.  Core Business Logic
  7.  Frontend Architecture
  8.  Email Service
  9.  File Storage
  10. Role-Based Access Control (RBAC)
  11. POS Webhook Integration
  12. Environment Variables / Secrets
  13. Deployment Architecture (AWS)
  14. CI/CD Pipeline
  15. Key User Flows (End-to-End)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. SYSTEM OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DutyBoost is a B2B2C SaaS travel retail platform. It connects three parties:
  - Travel Partners (agencies, hotels, car rentals, cruise/train operators)
  - Airport Retailers (duty-free shops, F&B merchants)
  - Travelers (end consumers)

Core value proposition:
  Travel partners generate "DutyCredits" when they issue bookings.
  Travelers redeem DutyCredits at partner airport retailers for discounts.
  DutyBoost earns a 2.5% platform fee on each redemption transaction.
  Travel partners earn a 0.5% commission on each redemption.

DutyCredit validity: 30 days from the traveler's departure date.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. TECHNOLOGY STACK RECOMMENDATION (AWS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRONTEND
  Framework:        React 18 + Vite
  Language:         JavaScript (or TypeScript)
  Styling:          Tailwind CSS + shadcn/ui
  State:            @tanstack/react-query (server state) + useState/useContext (local)
  Routing:          react-router-dom v6
  i18n:             i18next + react-i18next (6 languages: EN, NL, DE, FR, ES, IT)
  Charts:           Recharts
  QR Scanning:      jsQR (webcam-based scanning in-browser)
  Hosting:          AWS CloudFront + S3 (static site)

BACKEND
  Runtime:          Node.js 20 (or Deno 2)
  Framework:        Express.js (or Hono for Deno/edge)
  Language:         JavaScript / TypeScript
  Hosting:          AWS Lambda + API Gateway (or ECS Fargate for persistent service)
  Database:         PostgreSQL on AWS RDS
  ORM:              Prisma (recommended) or Drizzle
  Auth:             AWS Cognito (or Auth.js / custom JWT)
  Email:            Postmark (already used) or AWS SES
  File Storage:     AWS S3
  QR Code:          api.qrserver.com (external, already in use) or sharp + qrcode npm
  Payments:         Mollie (already integrated — keep existing)
  Secret Management: AWS Secrets Manager or SSM Parameter Store
  Cron / Scheduled: AWS EventBridge Scheduler → Lambda


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. DATABASE SCHEMA (PostgreSQL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

All tables include: id (UUID PK), created_at, updated_at, created_by (user email)

--- users ---
  id            UUID PK
  email         VARCHAR UNIQUE NOT NULL
  full_name     VARCHAR
  role          VARCHAR  -- 'admin' | 'agency' | 'retailer' | 'user'
  created_at    TIMESTAMP
  updated_at    TIMESTAMP

--- signup_applications ---
  id                  UUID PK
  full_name           VARCHAR NOT NULL
  email               VARCHAR NOT NULL
  company             VARCHAR NOT NULL
  business_type       VARCHAR  -- 'Travel Partner' | 'Airport Retailer' | 'Train Partner'
  website             VARCHAR
  kvk                 VARCHAR
  vat                 VARCHAR
  booking_system      VARCHAR
  airport             VARCHAR
  store_category      VARCHAR
  travel_partners     TEXT[]   -- array of partner names
  status              VARCHAR  -- 'pending' | 'invited' | 'rejected'
  mollie_customer_id  VARCHAR
  mollie_payment_id   VARCHAR
  payment_method      VARCHAR
  bank_account_name   VARCHAR
  bank_iban           VARCHAR
  terms_accepted      BOOLEAN DEFAULT false
  created_at          TIMESTAMP
  updated_at          TIMESTAMP

--- bookings ---
  id                    UUID PK
  booking_id            VARCHAR NOT NULL
  total_ticket_price    DECIMAL(10,2)
  number_of_travelers   INTEGER
  travel_type           VARCHAR  -- 'Short-haul' | 'Long-haul'
  departure_airport     VARCHAR
  travel_date           DATE
  return_date           DATE
  agency_email          VARCHAR
  traveler_email        VARCHAR
  flight_reminder_disabled BOOLEAN DEFAULT false
  created_at            TIMESTAMP
  updated_at            TIMESTAMP

--- vouchers ---
  id                  UUID PK
  voucher_code        VARCHAR UNIQUE NOT NULL  -- format: 'DB-XXXXXXXX'
  booking_id          VARCHAR NOT NULL
  discount_percentage DECIMAL(10,2)  -- stores euro credit amount, not a % despite name
  airport             VARCHAR
  expiration_date     DATE  -- travel_date + 30 days
  status              VARCHAR  -- 'active' | 'redeemed' | 'expired'
  traveler_count      INTEGER
  ticket_price        DECIMAL(10,2)
  travel_type         VARCHAR
  agency_email        VARCHAR
  traveler_email      VARCHAR
  created_at          TIMESTAMP
  updated_at          TIMESTAMP

--- retailers ---
  id              UUID PK
  store_name      VARCHAR NOT NULL
  airport         VARCHAR NOT NULL
  category        VARCHAR  -- 'Retail' | 'Food & Beverage'
  description     TEXT
  accepts_vouchers BOOLEAN DEFAULT true
  owner_email     VARCHAR
  created_at      TIMESTAMP
  updated_at      TIMESTAMP

--- transactions ---
  id                UUID PK
  voucher_code      VARCHAR NOT NULL
  retailer_id       UUID REFERENCES retailers(id)
  store_name        VARCHAR
  transaction_value DECIMAL(10,2)
  num_items         INTEGER
  discount_applied  DECIMAL(6,2)  -- effective % applied
  base_discount     DECIMAL(10,2)
  discount_amount   DECIMAL(10,2) -- euro saved by traveler
  platform_revenue  DECIMAL(10,2) -- 2.5% of gross
  agency_commission DECIMAL(10,2) -- 0.5% of gross
  agency_email      VARCHAR
  airport           VARCHAR
  created_at        TIMESTAMP
  updated_at        TIMESTAMP

--- airports ---
  id        UUID PK
  name      VARCHAR NOT NULL
  code      VARCHAR NOT NULL UNIQUE  -- IATA code e.g. AMS
  city      VARCHAR
  country   VARCHAR
  created_at TIMESTAMP
  updated_at TIMESTAMP

--- monthly_invoices ---
  id              UUID PK
  retailer_email  VARCHAR NOT NULL
  retailer_name   VARCHAR
  amount          DECIMAL(10,2)
  month_year      VARCHAR  -- 'YYYY-MM'
  invoice_date    DATE
  due_date        DATE
  status          VARCHAR  -- 'pending' | 'overdue' | 'paid'
  created_at      TIMESTAMP
  updated_at      TIMESTAMP

--- leads ---
  id              UUID PK
  company_name    VARCHAR NOT NULL
  website         VARCHAR
  industry        VARCHAR  -- 'Retail' | 'Agency'
  email           VARCHAR NOT NULL
  phone           VARCHAR
  full_name       VARCHAR NOT NULL
  position        VARCHAR
  decision_level  VARCHAR  -- 'Executive' | 'Manager' | 'Staff'
  created_at      TIMESTAMP
  updated_at      TIMESTAMP

--- survey_responses ---
  id                    UUID PK
  company_name          VARCHAR
  company_website       VARCHAR
  full_name             VARCHAR
  email                 VARCHAR
  phone                 VARCHAR
  company_type          VARCHAR
  annual_bookings       VARCHAR
  current_loyalty       VARCHAR
  interest_level        VARCHAR
  commission_attractive VARCHAR
  snippet_willingness   VARCHAR
  biggest_challenge     TEXT
  wants_demo            BOOLEAN DEFAULT false
  created_at            TIMESTAMP

--- travel_agencies ---
  id        UUID PK
  name      VARCHAR NOT NULL
  website   VARCHAR
  country   VARCHAR DEFAULT 'Netherlands'
  created_at TIMESTAMP
  updated_at TIMESTAMP

--- retailer_feedback ---
  id          UUID PK
  voucher_code VARCHAR
  airport     VARCHAR
  store_name  VARCHAR
  rating      INTEGER  -- 1–5
  comment     TEXT
  created_at  TIMESTAMP

--- fnb_merchants ---
  id            UUID PK
  merchant_name VARCHAR NOT NULL
  airport_code  VARCHAR
  category      VARCHAR  -- 'F&B' | 'Retail' | 'Mixed'
  status        VARCHAR  -- 'active' | 'inactive'
  pos_endpoint  VARCHAR
  contact_email VARCHAR
  created_at    TIMESTAMP
  updated_at    TIMESTAMP

--- fnb_duty_credits ---
  id                    UUID PK
  token_id              VARCHAR NOT NULL
  user_id               VARCHAR
  credit_type           VARCHAR DEFAULT 'FNB_ONLY'
  balance               DECIMAL(10,2)
  remaining_balance     DECIMAL(10,2)
  airport               VARCHAR
  expiry                TIMESTAMP
  status                VARCHAR  -- 'active' | 'used' | 'expired' | 'partially_used'
  corporate_policy_id   UUID
  traveler_email        VARCHAR
  traveler_name         VARCHAR
  created_at            TIMESTAMP
  updated_at            TIMESTAMP

--- corporate_policies ---
  id                    UUID PK
  policy_name           VARCHAR NOT NULL
  company_name          VARCHAR NOT NULL
  daily_limit           DECIMAL(10,2)
  per_transaction_limit DECIMAL(10,2)
  allowed_categories    TEXT DEFAULT 'F&B'
  breakfast_window      VARCHAR  -- e.g. '06:00-10:00'
  lunch_window          VARCHAR
  dinner_window         VARCHAR
  status                VARCHAR DEFAULT 'active'
  created_at            TIMESTAMP
  updated_at            TIMESTAMP

--- corporate_travelers ---
  id                    UUID PK
  full_name             VARCHAR NOT NULL
  email                 VARCHAR NOT NULL
  employee_id           VARCHAR
  department            VARCHAR
  cost_center           VARCHAR
  company_name          VARCHAR
  corporate_policy_id   UUID REFERENCES corporate_policies(id)
  daily_fnb_budget      DECIMAL(10,2)
  per_transaction_limit DECIMAL(10,2)
  status                VARCHAR DEFAULT 'active'
  notes                 TEXT
  created_at            TIMESTAMP
  updated_at            TIMESTAMP

--- budget_allocations ---
  id                        UUID PK
  company_name              VARCHAR NOT NULL
  year                      INTEGER
  total_annual_budget       DECIMAL(12,2)
  release_mode              VARCHAR  -- 'monthly' | 'trip_based' | 'quarterly'
  monthly_cap               DECIMAL(10,2)
  saas_fee                  DECIMAL(10,2)
  take_rate_pct             DECIMAL(5,2) DEFAULT 5
  unused_expiry_policy      VARCHAR  -- 'expire' | 'rollover'
  allocated_to_departments  TEXT  -- JSON string
  status                    VARCHAR DEFAULT 'draft'
  notes                     TEXT
  created_at                TIMESTAMP
  updated_at                TIMESTAMP


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. AUTHENTICATION ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommended: AWS Cognito User Pools

  - Email/password login (primary)
  - Magic link login (already used via sendMagicLink function)
  - JWT access tokens with short TTL (1h) + refresh tokens (30 days)
  - User roles stored in Cognito custom attributes OR in your own DB users table

Token flow:
  Client → POST /auth/login → Server validates → Returns JWT
  Client stores JWT in memory (not localStorage for security)
  Client sends JWT in Authorization: Bearer <token> header on every request
  Server middleware decodes + verifies JWT on every protected route

Role-based middleware pattern (Express.js):
  function requireRole(...roles) {
    return (req, res, next) => {
      const user = req.user; // set by JWT middleware
      if (!roles.includes(user.role)) return res.status(403).json({ error: 'Forbidden' });
      next();
    };
  }

User roles:
  admin     — full access to everything
  agency    — travel partner (can generate DutyCredits, view own transactions)
  retailer  — airport retailer (can scan/redeem vouchers, view own stats)
  user      — general (traveler-facing, limited access)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. BACKEND API DESIGN (REST)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BASE URL: https://api.dutyboost.com/v1

All endpoints return JSON. Auth endpoints marked with [public].
All others require Authorization: Bearer <token> header.

--- AUTH ---
  POST   /auth/login              [public]  Email + password login
  POST   /auth/magic-link         [public]  Send magic link email
  POST   /auth/magic-link/verify  [public]  Verify magic link token → return JWT
  POST   /auth/logout             Invalidate refresh token
  GET    /auth/me                 Return current user profile
  PATCH  /auth/me                 Update current user profile

--- VOUCHERS / DUTYCREDITS ---
  POST   /vouchers/generate       [agency|admin]  Generate DutyCredit from booking
    Body: { booking_id, total_ticket_price, number_of_travelers, travel_type,
            departure_airport, travel_date, return_date?, traveler_email, traveler_name? }
    Returns: { voucher_code, credit_amount_eur, expiration_date, qr_image_url }

  GET    /vouchers                [admin]         List all vouchers (paginated)
  GET    /vouchers/my             [agency]        List vouchers created by this agency
  GET    /vouchers/:code          [admin|agency]  Get single voucher by code
  POST   /vouchers/:code/expire   [admin]         Manually expire a voucher

--- POS / REDEMPTION ---
  POST   /pos/redeem              [public + POS secret header]
    Header: X-POS-Secret: <secret>
    Body: { voucher_code, transaction_value, retailer_id, store_name, airport }
    Returns: { success, discount_amount, amount_due, platform_fee, agency_commission }

  GET    /pos/validate/:code      [public + POS secret]  Check voucher status without redeeming

--- RETAILERS ---
  GET    /retailers               [admin]        List all retailers
  POST   /retailers               [admin]        Create retailer
  GET    /retailers/:id           [admin|retailer] Get retailer
  PATCH  /retailers/:id           [admin]        Update retailer
  DELETE /retailers/:id           [admin]        Delete retailer
  GET    /retailers/my            [retailer]     Get own retailer profile

--- TRANSACTIONS ---
  GET    /transactions            [admin]        All transactions (paginated, filterable)
  GET    /transactions/my         [agency]       Transactions for this agency's vouchers
  GET    /transactions/retailer   [retailer]     Transactions at this retailer
  GET    /transactions/:id        [admin]        Single transaction

--- BOOKINGS ---
  GET    /bookings                [admin]        All bookings
  GET    /bookings/my             [agency]       Bookings by this agency
  POST   /bookings                [agency|admin] Create booking (usually auto-created with voucher)

--- USERS ---
  GET    /users                   [admin]        List all users
  POST   /users/invite            [admin]        Invite user by email + role
  PATCH  /users/:id/role          [admin]        Change user role
  DELETE /users/:id               [admin]        Delete user

--- SIGNUP APPLICATIONS ---
  POST   /applications            [public]       Submit signup application
  GET    /applications            [admin]        List all applications
  GET    /applications/:id        [admin]        Get single application
  POST   /applications/:id/approve [admin]       Approve + invite user
  POST   /applications/:id/reject  [admin]       Reject application
  DELETE /applications/:id        [admin]        Delete application

--- AIRPORTS ---
  GET    /airports                [public]       List all airports
  POST   /airports/import         [admin]        Bulk import airports

--- INVOICES ---
  GET    /invoices                [admin]        List all monthly invoices
  POST   /invoices/generate       [admin]        Generate invoices for a given month
  PATCH  /invoices/:id            [admin]        Update invoice status (paid/overdue)

--- LEADS ---
  POST   /leads                   [public]       Submit lead from landing page
  GET    /leads                   [admin]        List leads

--- SURVEYS ---
  POST   /surveys/travel-partner  [public]       Submit travel partner survey
  POST   /surveys/retailer        [public]       Submit retailer survey
  GET    /surveys                 [admin]        List all survey responses

--- ANALYTICS ---
  GET    /analytics/dashboard     [admin]        Platform-wide KPIs
  GET    /analytics/agency        [agency]       Agency-specific metrics
  GET    /analytics/retailer      [retailer]     Retailer-specific metrics
  POST   /analytics/daily-metrics [admin/cron]   Generate/aggregate daily metrics

--- EMAIL ---
  POST   /email/flight-reminder   [cron]         Send flight reminders to travelers
  POST   /email/welcome           [internal]     Send welcome email after invite


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. CORE BUSINESS LOGIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. DutyCredit Calculation (generateDutyCredit)
---------------------------------------------
  Config:
    Short-haul base:  €2.50 per traveler
    Long-haul base:   €7.00 per traveler
    Floor:            €5.00
    Cap:              €60.00

  Multipliers (based on total ticket price):
    < €200:   1.0x
    €200–499: 1.5x
    €500–999: 2.0x
    ≥ €1000:  2.5x

  Formula:
    raw = basePerTraveler * numTravelers * multiplier
    creditAmount = clamp(raw, floor=5, cap=60)

  Expiration:
    expirationDate = travelDate + 30 days

  Voucher code format: 'DB-' + 8 random alphanumeric chars (e.g. DB-A3X7KQ2P)

B. Redemption Tiers (posWebhook)
--------------------------------
  Applied at the POS terminal when traveler presents QR code.
  Based on basket (transaction) value:

    €70 – €99   → Boarding DutyCredit:  €10 discount
    €100 – €199 → Priority DutyCredit:  €30 discount
    €200 – €299 → Lounge DutyCredit:    €45 discount
    ≥ €300      → VIP DutyCredit:       €60 discount
    < €70       → Not eligible (minimum spend)

  Financial split per transaction:
    Platform revenue (DutyBoost fee): 2.5% of gross transaction value
    Agency commission:                 0.5% of gross transaction value
    Retailer pays:                     discountAmount to traveler
    Net to retailer:                   grossValue - discountAmount

  NOTE: The discount_percentage field in the vouchers table stores the
  euro credit amount (not a percentage) — this is a legacy naming issue.
  The actual euro discount applied at the POS is determined by calcBasketCredit()
  based on basket size, not the voucher's stored value.

C. Voucher Lifecycle
--------------------
  active → redeemed  (after successful POS scan)
  active → expired   (if expiration_date < today when scanned)
  Manual: admin can force-expire a voucher

D. Invoice Generation (monthly)
-------------------------------
  Run on the 1st of each month via cron.
  For each retailer: sum all transactions from prior month.
  Create MonthlyInvoice record with:
    amount = total platform_revenue for that retailer
    due_date = invoice_date + 14 days
    status = 'pending'
  Send invoice email to retailer.

E. Agency Payouts (monthly)
---------------------------
  Run on the 1st of each month via cron.
  For each agency: sum all agency_commission from prior month's transactions.
  Process payout via Mollie API (bank transfer to agency IBAN).

F. Flight Reminders
-------------------
  Run daily via cron.
  Find bookings where travel_date = tomorrow AND flight_reminder_disabled = false.
  Send reminder email to traveler_email with their voucher code + QR.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. FRONTEND ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Directory Structure:
  /src
  ├── api/
  │   └── client.js          # Axios instance with base URL + auth interceptor
  ├── pages/
  │   ├── LandingPage.jsx
  │   ├── ComingSoonPage.jsx
  │   ├── GetStarted.jsx          # Signup application form
  │   ├── AgencyPortal.jsx        # Travel partner dashboard
  │   ├── RetailerPortal.jsx      # Retailer dashboard
  │   ├── RetailerScanQR.jsx      # QR scanner for redemptions
  │   ├── AdminDashboard.jsx      # Admin analytics
  │   ├── AdminPanel.jsx          # User/app management
  │   ├── ScanVoucher.jsx         # Voucher scan/lookup
  │   ├── FAQ.jsx
  │   ├── TermsOfService.jsx
  │   ├── PrivacyPolicy.jsx
  │   ├── UserGuide.jsx
  │   ├── BusinessTravel.jsx      # Corporate F&B credits landing
  │   ├── CorporateTravelAdmin.jsx
  │   ├── Demo*.jsx               # Demo/showcase pages
  │   └── Survey*.jsx             # Survey pages (6 languages each)
  ├── components/
  │   ├── Layout.jsx              # Sidebar + nav shell
  │   ├── DutyBoostLogo.jsx
  │   ├── BookingForm.jsx         # Generate DutyCredit form
  │   ├── VoucherCard.jsx
  │   ├── QRScanner.jsx           # jsQR-based scanner
  │   ├── QRCodeDisplay.jsx
  │   ├── PageFooter.jsx
  │   ├── LanguageSwitcher.jsx
  │   └── ui/                    # shadcn/ui components (keep as-is)
  ├── lib/
  │   ├── AuthContext.jsx         # Replace Base44 auth with your own JWT auth
  │   ├── i18n.js                 # i18next config
  │   └── discountCalculator.js   # calcBasketCredit() pure function
  ├── locales/
  │   ├── en.js
  │   ├── nl.js
  │   ├── de.js
  │   ├── fr.js
  │   ├── es.js
  │   └── it.js
  ├── hooks/
  │   └── use-mobile.jsx
  ├── utils/
  │   ├── encryptionUtils.js
  │   ├── exportToPptx.js
  │   └── exportRetailerPptx.js
  └── App.jsx                    # React Router config

API Client Pattern (replacing Base44 SDK):
  // src/api/client.js
  import axios from 'axios';

  const api = axios.create({ baseURL: 'https://api.dutyboost.com/v1' });

  api.interceptors.request.use(config => {
    const token = getToken(); // from memory/context
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
  });

  export default api;

  // Usage in components:
  import api from '@/api/client';
  const { data } = await api.post('/vouchers/generate', bookingData);

Replace Base44 entity calls with:
  base44.entities.Voucher.list()          →  api.get('/vouchers')
  base44.entities.Voucher.create(data)    →  api.post('/vouchers/generate', data)
  base44.entities.Transaction.filter({}) →  api.get('/transactions')
  base44.auth.me()                        →  api.get('/auth/me')


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. EMAIL SERVICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Provider: Postmark (already in use — keep same credentials)

Emails sent by the platform:
  1. DutyCredit email       — traveler receives QR code + discount info
  2. Welcome email          — new partner onboarded after approval
  3. Magic link             — passwordless login
  4. Flight reminder        — day before departure
  5. Monthly invoice        — sent to retailers
  6. Voucher redemption     — confirmation to agency
  7. Lead confirmation      — auto-reply when lead submits form

Postmark integration:
  npm install postmark

  import { ServerClient } from 'postmark';
  const client = new ServerClient(process.env.POSTMARK_API_KEY);

  await client.sendEmail({
    From: 'hello@dutyboost.com',
    To: recipientEmail,
    Subject: subject,
    HtmlBody: htmlBody,
  });

Email templates to recreate:
  - DutyCredit voucher email (blue gradient header, QR code, discount tiers table)
  - Welcome/onboarding email
  - Invoice email with PDF attachment
  - Flight reminder email


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. FILE STORAGE (AWS S3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Buckets:
  dutyboost-public      — logos, public assets (CloudFront CDN)
  dutyboost-private     — signed documents, invoices (no public access)

S3 SDK usage:
  import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
  import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

  const s3 = new S3Client({ region: 'eu-west-1' });

  // Upload
  await s3.send(new PutObjectCommand({
    Bucket: 'dutyboost-private',
    Key: 'invoices/' + invoiceId + '.pdf',
    Body: pdfBuffer,
    ContentType: 'application/pdf',
  }));

  // Generate short-lived download URL
  const url = await getSignedUrl(s3, new GetObjectCommand({
    Bucket: 'dutyboost-private',
    Key: 'invoices/' + invoiceId + '.pdf',
  }), { expiresIn: 300 });


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. ROLE-BASED ACCESS CONTROL (RBAC)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Role           Permissions
─────────────────────────────────────────────────────────────────────────────
admin          All endpoints. Manage users, applications, invoices, analytics.
agency         Generate DutyCredits. View own bookings, vouchers, transactions.
               View own commission data.
retailer       Scan QR codes (POS redemption). View own transactions and stats.
               Access own retailer profile.
user (public)  Submit applications, surveys, contact forms. No dashboard access.
─────────────────────────────────────────────────────────────────────────────

Row-level data filtering:
  - agency users: always filter transactions/vouchers by agency_email = currentUser.email
  - retailer users: always filter transactions by retailer_id = currentUser.retailerId
  - admin: no filter, sees everything

Data the POS webhook reads without a user login (authenticated by shared secret):
  - Voucher lookup and update
  - Transaction creation


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. POS WEBHOOK INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Endpoint: POST /pos/redeem
Authentication: Shared secret in header  X-POS-Secret: <secret>
               (retailer receives this during onboarding)

Request body:
  {
    "voucher_code":       "DB-A3X7KQ2P",
    "transaction_value":  150.00,
    "retailer_id":        "uuid-of-retailer",
    "store_name":         "World Duty Free — Gate B22",
    "airport":            "AMS"
  }

Success response:
  {
    "success": true,
    "transaction_id": "uuid",
    "voucher_code": "DB-A3X7KQ2P",
    "gross_value": 150.00,
    "effective_discount_pct": 20.00,
    "discount_amount": 30.00,
    "amount_due": 120.00,
    "platform_fee": 3.75,
    "agency_commission": 0.75,
    "message": "DutyCredit applied. Traveler saves €30.00."
  }

Error scenarios:
  401 — Invalid POS secret
  404 — Voucher not found
  409 — Voucher already redeemed or expired
  400 — Transaction value below €70 minimum


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. ENVIRONMENT VARIABLES / SECRETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Store all secrets in AWS Secrets Manager or SSM Parameter Store.
Never commit secrets to source control.

Required environment variables:
  DATABASE_URL           PostgreSQL connection string
  JWT_SECRET             Secret for signing JWT tokens (min 32 chars)
  POSTMARK_API_KEY       Postmark server token (currently: PostMark secret)
  MOLLIE_API_KEY         Mollie live API key (for payments and payouts)
  POS_WEBHOOK_SECRET     Shared secret distributed to POS retailers
  KVK_API_KEY            Dutch Chamber of Commerce validation API
  AWS_REGION             e.g. eu-west-1
  AWS_S3_BUCKET_PUBLIC   dutyboost-public
  AWS_S3_BUCKET_PRIVATE  dutyboost-private
  FRONTEND_URL           https://app.dutyboost.com (for CORS)
  FROM_EMAIL             hello@dutyboost.com

Optional / feature flags:
  QR_SERVICE_URL         https://api.qrserver.com/v1/create-qr-code (or self-hosted)
  ENABLE_CORPORATE_FNB   true|false (F&B corporate credit feature)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. DEPLOYMENT ARCHITECTURE (AWS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [Browser]
      │
      ├──── HTTPS ──→ [CloudFront CDN]
      │                    │
      │              ┌─────┴───────┐
      │              │             │
      │         [S3 bucket]    [API Gateway]
      │      (React app files)      │
      │                        [Lambda / ECS]
      │                        (Node.js API)
      │                             │
      │                    ┌────────┴────────┐
      │                    │                 │
      │               [RDS PostgreSQL]   [S3 Private]
      │               (eu-west-1)        (invoices etc.)
      │
      └──── POS Terminal ──→ [API Gateway /pos/redeem]

Recommended AWS services:
  Compute:      AWS Lambda (API) or ECS Fargate (if persistent connections needed)
  Database:     RDS PostgreSQL (Multi-AZ for production)
  CDN/Hosting:  CloudFront + S3
  Auth:         AWS Cognito or custom JWT
  Scheduler:    EventBridge Scheduler (for cron jobs)
  Secrets:      AWS Secrets Manager
  Monitoring:   CloudWatch + X-Ray
  DNS:          Route 53
  SSL:          AWS Certificate Manager (ACM)

Recommended regions: eu-west-1 (Ireland) — closest to Dutch/European users

Domain structure:
  app.dutyboost.com       → Frontend (CloudFront + S3)
  api.dutyboost.com       → Backend API (API Gateway + Lambda)
  dutyboost.com           → Landing page / marketing


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
14. CI/CD PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommended: GitHub Actions

Frontend pipeline (on push to main):
  1. npm ci
  2. npm run build
  3. aws s3 sync ./dist s3://dutyboost-public --delete
  4. aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"

Backend pipeline (on push to main):
  1. npm ci
  2. Run tests (jest or vitest)
  3. Deploy Lambda: serverless deploy or AWS CDK deploy
  4. Run DB migrations: npx prisma migrate deploy

Environments:
  staging    → staging.dutyboost.com / staging-api.dutyboost.com
  production → app.dutyboost.com / api.dutyboost.com

Branch strategy:
  main       → production deploy
  develop    → staging deploy
  feature/*  → PR → develop


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15. KEY USER FLOWS (END-TO-END)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FLOW 1: Travel Partner generates a DutyCredit
─────────────────────────────────────────────
  1. Agency user logs in → JWT issued
  2. Opens BookingForm component
  3. Fills in: booking_id, ticket price, # travelers, travel type,
     departure airport, travel date, traveler email
  4. Submits → POST /vouchers/generate
  5. Backend: calculateDutyCredit() → generate voucher code (DB-XXXXXXXX)
              → set expiration = travelDate + 30 days
              → save Booking + Voucher to DB
              → generate QR image URL
              → send DutyCredit email to traveler via Postmark
  6. Frontend: shows success + voucher code to agency user

FLOW 2: Traveler redeems DutyCredit at airport
───────────────────────────────────────────────
  1. Traveler arrives at participating store, shows QR on phone
  2. Cashier scans QR on POS terminal
  3. POS sends POST /pos/redeem with voucher_code + basket value
  4. Backend: validates secret → looks up voucher → checks status + expiry
              → calcBasketCredit(basketValue) → calculates financials
              → creates Transaction record → marks Voucher as 'redeemed'
              → returns discount breakdown to POS
  5. POS applies discount, prints receipt showing €X saved

FLOW 3: New partner onboarding
───────────────────────────────
  1. Partner fills /get-started signup form (POST /applications)
  2. Admin reviews in admin panel → approves (POST /applications/:id/approve)
  3. Backend: sends invite email with magic link
  4. Partner clicks link → authenticated → role set (agency or retailer)
  5. Partner can now access their portal

FLOW 4: Monthly retailer billing
──────────────────────────────────
  1. EventBridge Scheduler triggers cron on 1st of month
  2. Lambda POST /invoices/generate runs:
     - Sums transactions per retailer for previous month
     - Creates MonthlyInvoice records
     - Sends invoice emails via Postmark
  3. Retailer pays via Mollie payment link
  4. Mollie webhook → update invoice status to 'paid'

FLOW 5: Agency commission payout
──────────────────────────────────
  1. EventBridge Scheduler triggers cron on 1st of month
  2. Lambda aggregates agency_commission per agency
  3. Initiates Mollie bank transfer to agency IBAN
  4. Logs payout in system


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MIGRATION CHECKLIST (Base44 → AWS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [ ] Export all production data from Base44 (CSV/JSON)
  [ ] Set up RDS PostgreSQL with schema above
  [ ] Import data into PostgreSQL tables
  [ ] Build Express.js API with all endpoints in section 5
  [ ] Replace base44.auth.me() with JWT middleware
  [ ] Replace base44.entities.X.list() with API calls
  [ ] Replace base44.integrations.Core.SendEmail() with Postmark SDK
  [ ] Set up AWS Cognito (or JWT) auth
  [ ] Set up S3 buckets
  [ ] Deploy backend to Lambda (or ECS)
  [ ] Deploy frontend to S3 + CloudFront
  [ ] Configure EventBridge cron jobs for:
      - sendFlightReminders (daily)
      - generateMonthlyInvoices (1st of month)
      - generateMonthlyAgencyPayouts (1st of month)
      - checkOverdueInvoices (daily)
      - cleanupOldLeads (weekly)
  [ ] Configure custom domains + SSL
  [ ] Move all secrets to AWS Secrets Manager
  [ ] Run end-to-end test: generate DutyCredit → redeem at POS
  [ ] Enable monitoring (CloudWatch alarms on Lambda errors)

================================================================================
  END OF DOCUMENT
  DutyBoost Development Wireframe v1.0
  Prepared by DutyBoost Engineering
  © 2026 DutyBoost B.V. / Borderless Solutions B.V. — Confidential
================================================================================
`;

export default function DevWireframe() {
  const handleDownload = () => {
    const blob = new Blob([GUIDE_CONTENT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DutyBoost_Full_Stack_Development_Wireframe_v1.0.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-heading font-bold text-foreground">DutyBoost — Developer Wireframe</h1>
            <p className="text-xs text-muted-foreground">Full Stack Migration Guide v1.0</p>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download Guide
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-slate-400 text-xs font-mono">DutyBoost_Full_Stack_Development_Wireframe_v1.0.txt</span>
          </div>
          <pre className="p-6 text-sm font-mono leading-relaxed text-foreground overflow-x-auto whitespace-pre-wrap bg-slate-950 text-slate-100">
            {GUIDE_CONTENT}
          </pre>
        </div>

        <div className="mt-6 flex justify-center">
          <Button size="lg" onClick={handleDownload} className="gap-2">
            <Download className="w-5 h-5" />
            Download Full Development Guide
          </Button>
        </div>
      </div>
    </div>
  );
}