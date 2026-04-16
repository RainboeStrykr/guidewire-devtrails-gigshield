-- GigShield Supabase Schema
-- Run this in Supabase SQL Editor to create the required tables
--
-- Entity Relationship Diagram (paste into any Mermaid renderer):
--
-- ```mermaid
-- erDiagram
--     riders {
--         uuid id PK
--         text name
--         text phone UK
--         text zone
--         text platform
--         int fraud_score
--         timestamptz created_at
--     }
--     policies {
--         uuid id PK
--         text policy_id UK
--         uuid rider_id FK
--         text tier
--         int premium
--         int max_coverage
--         text status
--         timestamptz created_at
--     }
--     trigger_alerts {
--         uuid id PK
--         text zone
--         numeric intensity
--         text trigger_type
--         text status
--         timestamptz created_at
--     }
--     riders ||--o{ policies : "has"
-- ```

-- Riders table
create table if not exists riders (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text unique not null,
  zone text not null,
  platform text not null,
  fraud_score integer default 12,
  created_at timestamptz default now()
);

-- Policies table
create table if not exists policies (
  id uuid default gen_random_uuid() primary key,
  policy_id text unique not null,
  rider_id uuid references riders(id) on delete cascade,
  tier text check (tier in ('Basic', 'Standard', 'Pro')) not null,
  premium integer not null,
  max_coverage integer not null,
  status text check (status in ('Active', 'Expired', 'Cancelled')) default 'Active',
  created_at timestamptz default now()
);

-- Trigger alerts table
create table if not exists trigger_alerts (
  id uuid default gen_random_uuid() primary key,
  zone text not null,
  intensity numeric not null,
  trigger_type text default 'Rainfall',
  status text check (status in ('Active', 'Resolved')) default 'Active',
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_riders_phone on riders(phone);
create index if not exists idx_policies_rider_id on policies(rider_id);
create index if not exists idx_policies_policy_id on policies(policy_id);
create index if not exists idx_trigger_alerts_created_at on trigger_alerts(created_at desc);
