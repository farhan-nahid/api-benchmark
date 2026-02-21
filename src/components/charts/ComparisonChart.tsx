import type { TestResult } from '@/lib/run-autocannon'
import {
  Area,
  AreaChart,
  CartesianGrid,
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

  return (
    <div className="h-[300px] w-full mt-4">
      <h4 className="text-sm font-medium mb-4 text-center">{title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-background border rounded-lg p-3 shadow-lg text-xs">
                    <p className="font-bold text-primary">{data.name}</p>
                    <p className="text-muted-foreground truncate max-w-[200px] mb-1">
                      {data.fullUrl}
                    </p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                      <span className="font-mono font-bold text-base">
                        {payload[0].value}
                      </span>
                      <span className="text-muted-foreground">{unit}</span>
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
            fill="url(#colorValue)"
            animationBegin={0}
            animationDuration={1500}
            dot={{
              r: 5,
              fill: 'hsl(var(--background))',
              stroke: 'hsl(var(--primary))',
              strokeWidth: 2,
            }}
            activeDot={{
              r: 7,
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
