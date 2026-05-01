import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  // fake logic for now
  const stamps = Math.floor(Math.random() * 10);
  const reward = stamps >= 5;

  return NextResponse.json({
    success: true,
    customer_id: cid,
    stamps,
    reward,
  });
}
