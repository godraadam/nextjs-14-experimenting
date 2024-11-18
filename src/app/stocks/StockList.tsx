"use client";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import type { Stock } from "@/app/stocks/stock.types";
import StockListItem from "@/app/stocks/StockListItem";
import { useQueryState } from "nuqs";

const StockList = ({
  stocksFromServer,
}: {
  stocksFromServer: Array<Stock>;
}) => {
  const [stocks, setStocks] = useState(stocksFromServer);
  const [filteredStocks, setFilteredStocks] = useState<Array<Stock>>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search] = useQueryState("search", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const stocksToShow = search?.trim()?.length ? filteredStocks : stocks;
  const { isIntersecting, ref: observerRef } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    let isCanceled = false;

    const fetchStocks = async () => {
      const resp = (await fetch(
        `/api/stocks?page=${0}&count=${10}&search=${search}`
      ).then((res) => res.json())) as {
        data: Array<Stock>;
        meta: { page: number; hasMore: boolean };
      };
      if (!isCanceled) {
        setPage(1);
        setFilteredStocks(resp.data);
        setHasMore(resp.meta.hasMore);
      }
    };

    setFilteredStocks([]);
    if (search.trim().length) {
      fetchStocks();
    }

    return () => {
      isCanceled = true;
    };
  }, [search]);

  useEffect(() => {
    const fetchMoreStocks = async () => {
      console.log("fetching more...");
      const resp = (await fetch(
        `/api/stocks?page=${page}&count=${10}&search=${search}`
      ).then((res) => res.json())) as {
        data: Array<Stock>;
        meta: { page: number; hasMore: boolean };
      };
      if (search) {
        setFilteredStocks((prev) => [...prev, ...resp.data]);
      } else {
        setStocks((prev) => [...prev, ...resp.data]);
      }
      setHasMore(resp.meta.hasMore);
      setPage((prev) => prev + 1);
    };

    if (hasMore && isIntersecting) {
      fetchMoreStocks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isIntersecting]);

  return (
    <>
      <ul>
        {stocksToShow.map((stock) => (
          <li key={stock.symbol}>
            <StockListItem stock={stock} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="h-5 text-sm text-gray-300 pt-2" ref={observerRef}>
          <p>Loading more stocks...</p>
        </div>
      )}
    </>
  );
};

export default StockList;
