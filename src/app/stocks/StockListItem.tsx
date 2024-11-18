import Link from "next/link";

import type { Stock } from "@/app/stocks/stock.types";

const StockListItem = ({ stock }: { stock: Stock }) => {
  return (
    <Link
      href={`/stocks/${stock.symbol}`}
      className="hover:text-gray-900 text-gray-700 transition-colors hover:underline"
    >
      {stock.name}
    </Link>
  );
};

export default StockListItem;
