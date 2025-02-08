import { NextRequest, NextResponse } from "next/server";
import { deleteCookie } from "cookies-next/server";

export async function POST(req: NextRequest) {
  const res = new NextResponse();

  await deleteCookie("token", { res, req });

  return res;
}
