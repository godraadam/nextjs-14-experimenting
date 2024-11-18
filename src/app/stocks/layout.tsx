import type { ReactNode } from "react";

import StockList from "@/app/stocks/StockList";
import { fetchStocks } from "@/app/stocks/stock.service";
import StockSearchBar from "@/app/stocks/StockSearchBar";

const StocksListPageLayout = async ({ children }: { children: ReactNode }) => {
  const {data: stocks} = await fetchStocks({ offset: 0, limit: 10 });

  return (
    <div className="h-screen flex gap-2 px-4 py-8">
      <aside className="overflow-y-auto w-1/3">
        <StockSearchBar />
        <StockList stocksFromServer={stocks} />
      </aside>
      <main className="w-2/3">{children}</main>
    </div>
  );
};

export default StocksListPageLayout;
