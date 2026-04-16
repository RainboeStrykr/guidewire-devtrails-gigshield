-- Migration 002: Disable RLS on all tables
-- Run this if you already created tables from supabase-schema.sql

alter table riders disable row level security;
alter table policies disable row level security;
alter table trigger_alerts disable row level security;
