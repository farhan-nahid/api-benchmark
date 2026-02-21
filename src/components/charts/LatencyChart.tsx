import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

interface LatencyData {
  p50: number
  p75: number
  p90: number
  p99: number
}

interface LatencyChartProps {
  data: LatencyData
}

export function LatencyChart({ data }: LatencyChartProps) {
  const chartData = [
    { name: 'P50', value: data.p50 },
    { name: 'P75', value: data.p75 },
    { name: 'P90', value: data.p90 },
    { name: 'P99', value: data.p99 },
  ]

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            label={{
              value: 'ms',
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12,
            }}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 4
                    ? 'hsl(var(--destructive))'
                    : 'hsl(var(--primary))'
                }
                fillOpacity={0.8 + index * 0.05}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
