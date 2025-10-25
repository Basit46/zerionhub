"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { LucideArrowUpRight, LucideChartCandlestick } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import DataTable from "../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import axiosCoingeckoApi from "@/libs/axiosCoingecko";

const Markets = () => {
  const router = useRouter();
  const { data: coins = [], isLoading } = useQuery({
    queryKey: ["markets"],
    queryFn: async () => {
      const res = await axiosCoingeckoApi("/coins/markets?vs_currency=usd");
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 12,
  });

  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Asset",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <Image src={row.original.image} width={28} height={28} alt="coin" />
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-grey-700 leading-none">{row.original.name}</p>
            </div>
            <p className="text-grey-700 font-medium uppercase">
              {row.original.symbol}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "current_price",
      header: "Price",
      cell: ({ row }) => (
        <span className="text-grey-700">
          ${row.original.current_price?.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "market_cap",
      header: "Market cap",
      cell: ({ row }) => (
        <span className="text-grey-700">
          ${row.original.market_cap?.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "fully_diluted_valuation",
      header: "FDV",
      cell: ({ row }) => (
        <span className="text-grey-700">
          ${row.original.fully_diluted_valuation?.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "total_volume",
      header: "Volume",
      cell: ({ row }) => (
        <span className="text-grey-700 text-center">
          ${row.original.total_volume?.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "high_24h",
      header: "24h High",
      cell: ({ row }) => (
        <span className="text-grey-700 text-center">
          ${row.original.high_24h?.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "low_24h",
      header: "24h Low",
      cell: ({ row }) => (
        <span className="text-grey-700 text-center">
          ${row.original.low_24h?.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "price_change_percentage_24h",
      header: "Change (24h)",
      cell: ({ row }) => (
        <Badge
          variant={
            !row.original.price_change_percentage_24h?.toString().includes("-")
              ? "secondary"
              : "destructive"
          }
        >
          {row.original.price_change_percentage_24h?.toFixed(2)}%
        </Badge>
      ),
    },
  ];

  const handleRowClick = (id: string) => {
    router.push(`/markets/${id}`);
  };

  const filteredData = useMemo(() => {
    if (!coins) return [];

    return coins.filter((asset: any) =>
      asset.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }, [coins, searchValue]);

  return (
    <div className="w-full flex flex-col p-[20px]">
      <header className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LucideChartCandlestick className="size-[24px]" />
          <p>Markets</p>
        </div>
      </header>

      <div className="flex-1 w-full py-[20px] overflow-y-auto">
        <div>
          <div>
            <div className="mt-[12px] grid sm:grid-cols-2 lg:flex gap-[20px]">
              {coins?.slice(0, 5).map((asset: any) => {
                const isUp = asset?.price_change_percentage_24h > 0;
                return (
                  <div
                    key={asset?.id}
                    className="w-full p-[12px] md:p-[16px] bg-gray-900 rounded-lg border border-gray-700 h-[130px] md:h-[150px] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <Image
                        src={asset?.image}
                        width={30}
                        height={30}
                        alt={asset?.name}
                      />
                      <p className="flex-1 mx-[6px]">
                        {asset?.name}{" "}
                        <span className="uppercase">({asset?.symbol})</span>
                      </p>
                      <button
                        onClick={() => router.push(`/markets/${asset.id}`)}
                        className="size-[28px] rounded-full shadow-sm border border-grey-300 grid place-items-center"
                      >
                        <LucideArrowUpRight className="size-[16px] text-grey-700" />
                      </button>
                    </div>

                    <p className="text-grey-900 font-semibold text-[24px] md:text-[32px]">
                      ${asset?.current_price}
                    </p>

                    <div className="flex items-center gap-[8px]">
                      <Badge variant={isUp ? "secondary" : "destructive"}>
                        {asset?.price_change_percentage_24h?.toFixed(2)}%
                      </Badge>
                      <p className="text-[12px] text-grey-500">
                        {isUp ? "gain" : "loss"} for ETH
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-[24px]">
            <h1 className="text-[24px] text-grey-800">Coins</h1>

            <div className="mt-[10px] sm:mt-[20px] mb-[16px] flex items-center justify-between">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-[300px]"
                placeholder="Search asset..."
              />
            </div>

            {!isLoading && (
              <DataTable
                data={filteredData}
                columns={columns}
                handleRowClick={handleRowClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;
