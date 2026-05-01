import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/customers?id=eq.${cid}`,
    {
      headers: {
        apikey: process.env.SUPABASE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      },
    }
  );

  const data = await res.json();

  let stamps = 0;

  if (data.length > 0) {
    stamps = data[0].stamps;
  }

  return NextResponse.json({
    success: true,
    customer_id: cid,
    stamps,
    reward: stamps >= 5,
  });
}
