"use client";

import { LucideChartArea } from "lucide-react";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = Array.from({ length: 365 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (364 - i));

  return {
    day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: 90000 + Math.sin(i / 25) * 3000 + i * 50,
  };
});

const PortfolioChartCard = () => {
  return (
    <div className="main-card p-[12px] flex flex-col gap-[12px]">
      <div className="flex items-center gap-2 text-text-600">
        <LucideChartArea className="size-[20px]" />
        <p>Portfolio Overview</p>
      </div>

      <h1 className="text-[28px] font-medium">$127,390.92</h1>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="aquaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D3C4" stopOpacity={0.2} />
                {/* <stop offset="95%" stopColor="#00D3C4" stopOpacity={0.05} /> */}
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="2 15" stroke="var(--gray-500)" />
            <XAxis
              dataKey="day"
              stroke="#8A8A8A"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: "12px",
              }}
            />
            <YAxis
              stroke="#8A8A8A"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: "12px",
              }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "#1C1C1C",
                border: "1px solid #333",
                color: "#fff",
              }}
              labelStyle={{ color: "white" }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#00D3C4"
              strokeWidth={2}
              fill="url(#aquaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChartCard;
