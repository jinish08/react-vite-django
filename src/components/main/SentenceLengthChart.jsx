import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const SentenceLengthChart = ({ data }) => {
  const colorMap = {
    LONG: "#FFB3B3",
    MEDIUM: "#FFEA79",
    SHORT: "#ACE986",
  };

  for (const entry of data) {
    const color = colorMap[entry.type];
    entry.fill = `url(#color${color})`;
  }

  return (
    <div className="graph">
      <BarChart
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
          {Object.values(colorMap).map((color) => (
            <linearGradient
              key={color}
              id={`color${color}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.75} />
              <stop offset="95%" stopColor={color} stopOpacity={0.5} />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          label={{
            value: "Sentence Type",
            position: "insideBottom",
            offset: -10,
            fontSize: "10px",
          }}
          dataKey="type"
          tickLine={false}
          style={{ fontSize: "10px" }}
        />
        <YAxis
          label={{
            value: "Count",
            angle: -90,
            position: "insideMiddle",
            offset: -10,
            fontSize: "10px",
          }}
          tickLine={false}
          style={{ fontSize: "10px" }}
        />
        <Tooltip labelFormatter={(label) => `Type: ${label}`} />
        <Bar
          dataKey="count"
          fill="url(#colorRevenue)"
          fillOpacity={1}
          type="monotone"
        />
      </BarChart>
    </div>
  );
};

export default SentenceLengthChart;
