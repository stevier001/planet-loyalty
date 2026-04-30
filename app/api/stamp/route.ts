import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  return NextResponse.json({
    success: true,
    customer_id: cid,
  });
}
