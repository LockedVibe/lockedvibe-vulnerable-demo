"use client";
// DEMO VULNERABILITY: service_role key hardcoded in browser code (fake key, demo only)
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://demofakeprojectref00.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW9mYWtlcHJvamVjdHJlZjAwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwLCJub3RlIjoiRkFLRSBERU1PIEtFWSAtIG5vdCB2YWxpZCBhbnl3aGVyZSJ9.mHHYisG-6hyIzQtA0mDYQf3keT9EXZ8blW7dNSJu_nk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
