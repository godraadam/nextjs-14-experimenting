import { stockDetails, stocks } from "@/app/stocks/stock.mock-data";

export async function fetchStocks({
  limit = 20,
  offset = 0,
  search,
}: {
  limit?: number;
  offset?: number;
  search?: string;
}) {
  await new Promise((res) => setTimeout(res, 1200));
  const filteredStocks = search
    ? stocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(search.toLowerCase()) ||
          stock.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : stocks;
  return {
    data: filteredStocks.slice(offset, offset + limit),
    meta: { hasMore: limit + offset < filteredStocks.length },
  };
}

export async function fetchStockDetails({ symbol }: { symbol: string }) {
  await new Promise((res) => setTimeout(res, 1200));
  return stockDetails.find((stock) => stock.symbol == symbol);
}
