import { fetchStockDetails } from "@/app/stocks/stock.service";

const StocksDetails = async ({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) => {
  const symbol = (await params).symbol;
  const stockDetails = await fetchStockDetails({ symbol });
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 pb-1">{symbol}</h1>
      <p className="text-lg text-gray-400 font-bold pb-4">${stockDetails?.value}</p>
    </div>
  );
};

export default StocksDetails;
