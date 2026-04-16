-- GigShield Supabase Schema
-- Run this in Supabase SQL Editor to create the required tables

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
