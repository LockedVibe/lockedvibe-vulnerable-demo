// DEMO VULNERABILITY: no authentication or authorization check
import { supabase } from "../../../../lib/supabase";

export async function GET() {
  const { data } = await supabase.from("profiles").select("*");
  return Response.json(data);
}

export async function DELETE(request) {
  const { id } = await request.json();
  await supabase.auth.admin.deleteUser(id);
  return Response.json({ ok: true });
}
