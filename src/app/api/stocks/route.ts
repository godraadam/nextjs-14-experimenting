import { NextRequest } from "next/server";

import { fetchStocks } from "@/app/stocks/stock.service";

export async function GET(request: NextRequest) {
  const count = Number(request.nextUrl.searchParams.get("count") ?? 20);
  const page = Number(request.nextUrl.searchParams.get("page") ?? 0);
  const search = request.nextUrl.searchParams.get("search") ?? undefined;

  return Response.json(
    await fetchStocks({ limit: count, offset: count * page, search })
  );
}
