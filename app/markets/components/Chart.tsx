import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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
import axios from "axios";
import { formatTimestamp } from "@/utils";

const Chart = ({
  timeframe,
  section,
}: {
  timeframe: "7" | "30" | "365";
  section: "prices" | "market_caps" | "total_volumes";
}) => {
  const { id } = useParams();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["markets", "chart", id, timeframe],
    queryFn: async () => {
      const res = await axios.get(`/api/coins/${id}/${timeframe}`);
      return res.data;
    },
  });

  const values = data?.[section]?.map((v: string[]) => ({
    time: v[0],
    value: v[1],
  }));
  console.log(values);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={values}
        margin={{ left: 0, right: 40, top: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--aqua-300)" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <YAxis
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            `$${
              section === "prices"
                ? value.toLocaleString()
                : `${(value / 1000000000).toLocaleString()}B`
            }`
          }
        />
        <CartesianGrid strokeDasharray="3 3" opacity={1} vertical={false} />

        <Tooltip content={<CustomTooltip section={section} />} cursor={false} />

        <Area
          type="monotone"
          dataKey="value"
          fill="url(#gradient)"
          stroke="var(--aqua-600)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;

const CustomTooltip = ({ active, payload, section }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-gray-700 rounded-[8px] p-[6px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-aqua-600 text-[20px]">•</span>{" "}
          <p className="text-[14px] font-medium text-grey-800">
            {formatTimestamp(data?.time)}
          </p>
        </div>

        <div className="mt-[2px]">
          <p className="text-[12px] text-grey-700">
            {section == "prices"
              ? "Price"
              : section == "market_caps"
              ? "Market cap"
              : "Total volume"}
            : ${data?.value?.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};
