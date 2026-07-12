import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-ink text-white text-xs px-3 py-2 shadow-lg">
      <p className="mono">{label}</p>
      <p className="mono mt-0.5 font-medium">
        $
        {payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

export default function BalanceHistoryChart({ history, variant = "full" }) {
  if (variant === "mini") {
    return (
      <div className="h-12 w-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={history}
            margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B08D57" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#B08D57" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#B08D57"
              strokeWidth={2}
              fill="url(#sparkFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={history}
          margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid
            stroke="#5B6472"
            strokeOpacity={0.1}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "#5B6472", fontSize: 12 }}
            axisLine={{ stroke: "#5B6472", strokeOpacity: 0.2 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#5B6472", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            width={56}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#B08D57"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
