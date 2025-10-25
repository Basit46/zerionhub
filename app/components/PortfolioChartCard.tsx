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
  BarChart,
  Bar,
} from "recharts";

const data = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (11 - i));

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
          <BarChart
            data={data?.slice(-12)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="value"
              fill="var(--aqua-500)"
              barSize={40}
              minPointSize={2}
            />
          </BarChart>
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
            ${data.value?.toLocaleString()}
          </p>
        </div>

        <div className="mt-[2px]">
          <p className="text-[12px] text-grey-700">{data.day}</p>
        </div>
      </div>
    );
  }
  return null;
};
