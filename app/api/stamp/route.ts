import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cid = searchParams.get("cid");

    const { data, error } = await supabase
      .from("Customers")
      .select("*")
      .eq("id", cid)
      .single();

    if (error) {
      throw error;
    }

    const stamps = data?.stamps || 0;
    const reward = stamps >= 5;

    return NextResponse.json({
      success: true,
      customer_id: cid,
      stamps,
      reward,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
