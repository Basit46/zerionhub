"use client";

import { formatTimestamp, formatTimestamp2 } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideChartArea } from "lucide-react";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useActiveAccount } from "thirdweb/react";

const data = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (11 - i));

  return {
    time: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: 90000 + Math.sin(i / 25) * 3000 + i * 50,
  };
});

const PortfolioChartCard = () => {
  const account = useActiveAccount();

  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("year");

  // const { data: portfolio } = useQuery({
  //   queryKey: ["balance", account?.address],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `/api/zerion/wallet/${account?.address}/portfolio`
  //     );
  //     return res.data.data;
  //   },
  // });

  // const { data: chartData = [] } = useQuery({
  //   queryKey: ["portolio-chart", account?.address, timeframe],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `/api/zerion/wallet/${account?.address}/chart?timeframe=${timeframe}`
  //     );
  //     return res.data.data.attributes.points.map((item: number[]) => ({
  //       time: item[0],
  //       value: item[1],
  //     }));
  //   },
  // });

  return (
    // <div className="main-card h-[400px] lg:min-h-fit p-[12px] flex flex-col gap-[12px]">
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center gap-2 text-text-600">
    //       <LucideChartArea className="size-[20px]" />
    //       <p>Portfolio Overview</p>
    //     </div>
    //     <div className="chart-btns hidden vsm:flex w-fit h-[40px] bg-gray-700 px-[4px] py-[4px] rounded-[8px] items-center gap-2">
    //       <button
    //         onClick={() => setTimeframe("week")}
    //         className={timeframe == "week" ? "active" : ""}
    //       >
    //         7 days
    //       </button>
    //       <button
    //         onClick={() => setTimeframe("month")}
    //         className={timeframe == "month" ? "active" : ""}
    //       >
    //         1 month
    //       </button>
    //       <button
    //         onClick={() => setTimeframe("year")}
    //         className={timeframe == "year" ? "active" : ""}
    //       >
    //         1 year
    //       </button>
    //     </div>
    //   </div>

    //   <h1 className="text-[28px] font-medium">
    //     ${portfolio?.attributes?.total?.positions?.toFixed(2)}
    //   </h1>

    //   <div className="flex-1">
    //     <ResponsiveContainer width="100%" height="100%">
    //       <AreaChart
    //         data={chartData}
    //         margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    //       >
    //         <defs>
    //           <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
    //             <stop
    //               offset="5%"
    //               stopColor="var(--aqua-500)"
    //               stopOpacity={0.8}
    //             />
    //             <stop
    //               offset="95%"
    //               stopColor="var(--aqua-500)"
    //               stopOpacity={0}
    //             />
    //           </linearGradient>
    //         </defs>
    //         <Tooltip content={<CustomTooltip />} cursor={false} />
    //         <Area
    //           type="monotone"
    //           dataKey="value"
    //           stroke="var(--aqua-500)"
    //           strokeWidth={2}
    //           fillOpacity={1}
    //           fill="url(#colorValue)"
    //         />
    //       </AreaChart>
    //     </ResponsiveContainer>
    //   </div>
    // </div>

    <div className="main-card h-[400px] lg:min-h-fit p-[12px] flex flex-col gap-[12px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-600">
          <LucideChartArea className="size-[20px]" />
          <p>Portfolio Overview</p>
        </div>
        <div className="chart-btns hidden vsm:flex w-fit h-[40px] bg-gray-700 px-[4px] py-[4px] rounded-[8px] items-center gap-2">
          <button
            onClick={() => setTimeframe("week")}
            className={timeframe == "week" ? "active" : ""}
          >
            7 days
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={timeframe == "month" ? "active" : ""}
          >
            1 month
          </button>
          <button
            onClick={() => setTimeframe("year")}
            className={timeframe == "year" ? "active" : ""}
          >
            1 year
          </button>
        </div>
      </div>

      <h1 className="text-[28px] font-medium">$200</h1>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--aqua-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--aqua-500)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--aqua-500)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChartCard;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 p-2 shadow-sm rounded">
        <div className="flex items-center gap-[8px]">
          <span className="text-aqua-400 text-[20px]">•</span>{" "}
          <p className="text-[14px] font-medium text-grey-800">
            ${data?.value?.toLocaleString()}
          </p>
        </div>

        <div className="mt-[2px]">
          <p className="text-[12px] text-grey-700">
            {formatTimestamp2(data?.time)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};
