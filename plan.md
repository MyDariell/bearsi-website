# Bearsi Shop – Fullstack Architecture Plan

## Overview

Bearsi is a lightweight e‑commerce + scheduling site built entirely on Cloudflare’s edge stack. The goal is:

* fast UX
* minimal infra
* safe admin controls
* simple data export for operations (Google Sheets / Excel)

This document is the **source of truth** for architecture and data flow.

---

## Tech Stack

### Frontend

* **React** (Vite)
* **Cloudflare Pages** for deployment
* Talks to backend via HTTPS (`/api/*`)

### Backend

* **Cloudflare Workers** (Wrangler)
* REST-style API
* Handles auth, validation, and business logic

### Database

* **Cloudflare D1** (SQLite)
* Used for:

  * timeslot availability
  * orders / receipts

### Ops / Reporting

* **Google Sheets** as the human-facing “Excel”
* Data synced from D1 via admin-only Worker endpoints

---

## Core Data Models

### Timeslots

```sql
CREATE TABLE timeslots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT NOT NULL,
  date TEXT NOT NULL,           -- YYYY-MM-DD
  start_time TEXT NOT NULL,     -- HH:MM
  end_time TEXT NOT NULL,
  available INTEGER NOT NULL    -- 1 = available, 0 = unavailable
);
```

Used by frontend to display pickup availability.

---

### Orders (Receipts)

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_email TEXT,
  location TEXT,
  date TEXT,
  time_slot TEXT,
  amount INTEGER,
  created_at TEXT
);
```

This is the **single source of truth** for sales data.

---

## API Design

### Public (Frontend-facing)

#### Get available timeslots

```
GET /api/timeslots?location=brentwood
```

* Read-only
* Cached lightly (short TTL)

---

#### Create order

```
POST /api/orders
```

* Validates timeslot
* Inserts order
* Marks timeslot unavailable

---

### Admin (Protected)

> Admin routes are protected using **Cloudflare Access** or a static admin token.

#### Update timeslot availability

```
POST /admin/timeslots/update
```

---

#### Export orders (CSV)

```
GET /admin/orders/export
```

* Used for Excel downloads

---

#### Sync orders → Google Sheets

```
POST /admin/orders/sync-sheets
```

* Pushes latest DB rows into Google Sheets

---

## Google Sheets Integration (Important)

### Why Sheets instead of Excel files?

* Cloud-native
* Real-time sharing
* Excel-compatible
* No file-writing inside Workers

Sheets acts as a **reporting mirror**, not a database.

---

## Google Sheets Sync Flow

```
D1 Orders Table
   ↓
Cloudflare Worker (admin endpoint)
   ↓
Google Sheets API
   ↓
Live Sheet (Excel-friendly)
```

---

## Google Sheets Setup (One-time)

1. Create a Google Cloud project
2. Enable **Google Sheets API**
3. Create a **Service Account**
4. Download service account JSON
5. Share your Google Sheet with:

   ```
   service-account-name@project.iam.gserviceaccount.com
   ```

Store these as **Worker secrets**:

* `GSHEETS_CLIENT_EMAIL`
* `GSHEETS_PRIVATE_KEY`
* `GSHEETS_SHEET_ID`

---

## Worker Logic: Sync Orders → Sheets

### Pseudocode

```ts
// 1. Fetch orders from D1
const orders = await env.DB.prepare(
  "SELECT * FROM orders ORDER BY created_at ASC"
).all();

// 2. Convert to rows
const rows = orders.results.map(o => ([
  o.customer_email,
  o.location,
  o.date,
  o.time_slot,
  o.amount,
  o.created_at
]));

// 3. Send rows to Google Sheets API
POST https://sheets.googleapis.com/v4/spreadsheets/{sheetId}/values/Sheet1!A2:append
```

This endpoint is **manual or scheduled**, never public.

---

## Security Rules (Non‑negotiable)

* ❌ Frontend never writes directly to DB
* ✅ All writes go through Worker
* ✅ Admin routes protected by Access or token
* ✅ Validate timeslot availability server-side
* ✅ Rate-limit checkout endpoint

---

## Dev vs Prod

Use the same bindings, different databases:

* `DB` → dev D1
* `DB` → prod D1 (via env.production)

Frontend never changes.

---

## Future Enhancements

* Admin dashboard UI (React)
* Scheduled Sheets sync (cron trigger)
* Email receipt sending
* Inventory tracking
* Stripe / Square integration

---

## Philosophy

* D1 = source of truth
* Sheets = reporting only
* Edge first
* Simple > clever

This setup scales cleanly without painting you into a corner.
