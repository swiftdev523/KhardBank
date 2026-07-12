import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import EmptyState from "../shared/EmptyState";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = [
  "#B08D57",
  "#0B1E33",
  "#3D8361",
  "#B3452D",
  "#5B6472",
  "#c9a878",
  "#16304f",
  "#8a97a8",
  "#d8cbb2",
  "#7a8595",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="rounded-lg bg-ink text-white text-xs px-3 py-2 shadow-lg">
      <p className="font-medium">{name}</p>
      <p className="mono mt-0.5">
        ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

export default function SpendingChart({ transactions }) {
  const totals = {};
  transactions
    .filter((t) => t.type === "debit")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);

  if (!data.length) {
    return (
      <EmptyState
        icon={PieChartIcon}
        title="No spending yet"
        description="Spending breakdown will appear here."
      />
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={2}
            stroke="none">
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            wrapperStyle={{
              fontSize: 12,
              color: "#5B6472",
              lineHeight: "20px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
