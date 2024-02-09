import React from "react";
import { XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

const BreakdownLineChart = ({ data }) => {
  return (
    <div className="graph">
      <AreaChart
        width={320}
        height={200}
        data={data}
        margin={{
          top: 15,
          right: 25,
          left: -10,
          bottom: 15,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#12EFC8" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#12EFC8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="id"
          label={{
            value: "Sentence",
            position: "insideBottom",
            offset: -10,
            fontSize: "10px",
          }}
          tickLine={false}
          style={{ fontSize: "10px" }}
        />
        <YAxis
          label={{
            value: "Length",
            angle: -90,
            position: "insideMiddle",
            offset: -10,
            fontSize: "10px",
          }}
          tickLine={false}
          axisLine={{ strokeWidth: "0" }}
          style={{ fontSize: "10px" }}
        />
        <Tooltip labelFormatter={(label) => `Sentence: ${label}`} />
        <Area
          type="monotone"
          dataKey="length"
          dot={true}
          stroke={"#12EFC8"}
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </div>
  );
};

export default BreakdownLineChart;
