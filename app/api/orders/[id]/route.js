// DEMO VULNERABILITY: IDOR - order fetched by id without checking the owner
import { supabase } from "../../../../lib/supabase";

export async function GET(request, { params }) {
  const { data } = await supabase.from("orders").select("*").eq("id", params.id).single();
  return Response.json(data);
}
