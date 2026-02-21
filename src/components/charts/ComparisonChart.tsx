import type { TestResult } from '@/lib/run-autocannon'
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

interface ComparisonChartProps {
  results: TestResult[]
  metric: 'avgLatency' | 'p90' | 'rps' | 'totalRequests'
  title: string
  unit?: string
}

export function ComparisonChart({
  results,
  metric,
  title,
  unit,
}: ComparisonChartProps) {
  const chartData = results.map((res, index) => {
    let value = 0
    if (metric === 'avgLatency') value = res.latency?.average || 0
    else if (metric === 'p90') value = res.latency?.p90 || 0
    else if (metric === 'rps') value = res.requests?.average || 0
    else if (metric === 'totalRequests') value = res.requests?.total || 0

    return {
      name: `API ${index + 1}`,
      fullUrl: res.url,
      value: metric === 'totalRequests' ? value : parseFloat(value.toFixed(2)),
    }
  })

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ]

  return (
    <div className="h-[300px] w-full mt-4">
      <h4 className="text-sm font-medium mb-4 text-center">{title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
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
            label={
              unit
                ? {
                    value: unit,
                    angle: -90,
                    position: 'insideLeft',
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: 12,
                  }
                : undefined
            }
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg text-xs">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-muted-foreground truncate max-w-[200px]">
                      {data.fullUrl}
                    </p>
                    <p className="mt-1 font-mono text-primary">
                      {payload[0].value} {unit}
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
