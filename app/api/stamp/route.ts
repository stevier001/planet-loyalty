import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  const { data, error } = await supabase
    .from("Customers")
    .select("stamps")
    .eq("id", cid)
    .single();

  if (error || !data) {
    return NextResponse.json({ success: false, error });
  }

  const stamps = data.stamps;
  const reward = stamps >= 5;

  return NextResponse.json({
    success: true,
    customer_id: cid,
    stamps,
    reward,
  });
}
