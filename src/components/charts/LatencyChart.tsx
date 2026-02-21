import {
  Area,
  AreaChart,
  CartesianGrid,
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
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg text-xs">
                    <p className="font-bold text-primary mb-1">
                      {payload[0].payload.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono font-bold text-base">
                        {payload[0].value}
                      </span>
                      <span className="text-muted-foreground">ms</span>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorLatency)"
            animationDuration={1500}
            dot={{
              r: 4,
              fill: 'hsl(var(--background))',
              stroke: 'hsl(var(--primary))',
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: 'hsl(var(--primary))',
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
