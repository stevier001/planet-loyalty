import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  const stamps = 8; // fixed value
  const reward = stamps >= 5;

  return NextResponse.json({
    success: true,
    customer_id: cid,
    stamps,
    reward,
  });
}
