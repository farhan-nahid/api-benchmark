'use client'

import { MetricCard } from '@/components/MetricCard'
import { LatencyChart } from '@/components/charts/LatencyChart'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TestResult } from '@/lib/run-autocannon'
import {
  IconAlertCircle,
  IconBolt,
  IconCircleCheck,
  IconClock,
  IconPlayerPlay,
  IconRotate,
} from '@tabler/icons-react'
import { useState } from 'react'

export default function TestPage() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1')
  const [method, setMethod] = useState<
    'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  >('GET')
  const [duration, setDuration] = useState(5)
  const [connections, setConnections] = useState(10)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  const handleRunTest = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setTimeLeft(duration) // Start countdown

    // Countdown interval
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 0) return prev - 1
        clearInterval(interval)
        return null
      })
    }, 1000)

    try {
      const response = await fetch('/api/run-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, method, duration, connections }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to run test')
      }

      console.log('Test result:', data)

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      clearInterval(interval)
      setLoading(false)
      setTimeLeft(null) // Reset countdown
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Single API Test</h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Benchmark a single endpoint with custom configuration.
          </p>
        </div>
        {result && (
          <Button
            variant="outline"
            onClick={() => setResult(null)}
            className="flex items-center gap-2"
          >
            <IconRotate className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {!result ? (
        <Card className="border-2 border-primary/5 shadow-xl">
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>
              Configure the load test parameters below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel>API URL</FieldLabel>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com/v1/resource"
                  className="h-11"
                />
                <FieldDescription>
                  The endpoint you want to benchmark. Must be publicly
                  accessible.
                </FieldDescription>
              </Field>
            </FieldGroup>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field>
                <FieldLabel>HTTP Method</FieldLabel>
                <Select
                  value={method}
                  onValueChange={(val: any) => setMethod(val)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Duration (seconds)</FieldLabel>
                <Input
                  type="number"
                  min={1}
                  max={300}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="h-11"
                />
                <FieldDescription>
                  Max 300s for serverless stability.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Connections</FieldLabel>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={connections}
                  onChange={(e) => setConnections(parseInt(e.target.value))}
                  className="h-11"
                />
                <FieldDescription>
                  Concurrent requests (max 50).
                </FieldDescription>
              </Field>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-1">
                <IconAlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {loading && timeLeft !== null && (
              <p className="text-sm text-muted-foreground mb-2">
                Time remaining: <span className="font-bold">{timeLeft}s</span>
              </p>
            )}

            <Button
              onClick={handleRunTest}
              disabled={loading}
              className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <IconRotate className="h-4 w-4 animate-spin" />
                  Running Benchmark...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IconPlayerPlay className="h-4 w-4 fill-current" />
                  Run Test
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Requests/sec"
              value={result.requests.average.toFixed(2)}
              icon={<IconBolt className="h-4 w-4 text-yellow-500" />}
              description="Average throughput"
            />
            <MetricCard
              title="Avg Latency"
              value={result.latency.average.toFixed(2)}
              unit="ms"
              icon={<IconClock className="h-4 w-4 text-blue-500" />}
              description="Mean response time"
            />
            <MetricCard
              title="Total Requests"
              value={result.requests.total}
              icon={<IconCircleCheck className="h-4 w-4 text-green-500" />}
              description={`Successful tests over ${result.duration}s`}
            />
            <MetricCard
              title="Error Rate"
              value={((result.non2xx / result.requests.total) * 100).toFixed(1)}
              unit="%"
              icon={<IconAlertCircle className="h-4 w-4 text-destructive" />}
              description={`${result.non2xx} non-2xx responses`}
              className={result.non2xx > 0 ? 'border-destructive/50' : ''}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Latency Percentiles</CardTitle>
                    <CardDescription>
                      Visual distribution of response times.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    P90: {result.latency.p90}ms
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <LatencyChart data={result.latency} />
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Detailed Metrics</CardTitle>
                <CardDescription>Raw data from Autocannon.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Min Latency</span>
                    <span className="font-medium">{result.latency.min} ms</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Max Latency</span>
                    <span className="font-medium">{result.latency.max} ms</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">P99 Latency</span>
                    <span className="font-bold text-destructive">
                      {result.latency.p99} ms
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Throughput</span>
                    <span className="font-medium">
                      {(result.throughput.average / 1024 / 1024).toFixed(2)}{' '}
                      MB/s
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">
                      Total Transferred
                    </span>
                    <span className="font-medium">
                      {(result.throughput.total / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-muted-foreground">Timeouts</span>
                    <span className="font-medium">{result.timeouts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
