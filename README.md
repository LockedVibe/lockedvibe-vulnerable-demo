# ⚠️ lockedvibe-vulnerable-demo — DELIBERATELY INSECURE

**This is an intentionally vulnerable demo app, not a real product. Do not deploy it.**

LockedVibe uses it to test its Scan + Report pipeline and to produce a public sample report.
Every "secret" here is fake: it was generated for this demo and works against no real service.

Planted issues (so the scan results can be checked against ground truth):
1. A hardcoded Supabase `service_role` JWT in a client-side module (`lib/supabase.js`)
2. `/api/admin/users` route with no authentication check, using the service-role client
3. `/api/orders/[id]` route that never checks the order belongs to the caller (IDOR)
4. Supabase SQL with a table that has no RLS, an anon `using (true)` policy on private data, an update policy with `with check (true)`, and a role check on `user_metadata`
5. A vulnerable dependency version (`lodash@4.17.15`, prototype pollution, CVE-2020-8203)
6. `dangerouslySetInnerHTML` with user-controlled content
