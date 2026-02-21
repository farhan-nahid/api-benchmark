'use client'

import { ComparisonChart } from '@/components/charts/ComparisonChart'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
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
  IconChartBar,
  IconClock,
  IconPlayerPlay,
  IconPlus,
  IconRotate,
  IconTrash,
} from '@tabler/icons-react'
import { useState } from 'react'

export default function ComparePage() {
  const [urls, setUrls] = useState([
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/todos/1',
  ])
  const [method, setMethod] = useState<
    'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  >('GET')
  const [duration, setDuration] = useState(5)
  const [connections, setConnections] = useState(10)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(null) // <-- countdown

  const COLORS = [
    'border-primary',
    'border-blue-500',
    'border-green-500',
    'border-purple-500',
    'border-orange-500',
  ]

  const addUrl = () => {
    if (urls.length < 5) setUrls([...urls, ''])
  }

  const removeUrl = (index: number) => {
    if (urls.length > 2) {
      const newUrls = [...urls]
      newUrls.splice(index, 1)
      setUrls(newUrls)
    }
  }

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls]
    newUrls[index] = value
    setUrls(newUrls)
  }

  const handleRunCompare = async () => {
    setLoading(true)
    setError(null)
    setResults(null)
    setTimeLeft(duration) // start countdown

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 0) return prev - 1
        clearInterval(interval)
        return null
      })
    }, 1000)

    try {
      const response = await fetch('/api/compare-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls, method, duration, connections }),
      })

      const data = await response.json()

      if (!response.ok)
        throw new Error(data.error || 'Failed to run comparison')

      setResults(data.apis)
    } catch (err: any) {
      setError(err.message)
    } finally {
      clearInterval(interval)
      setLoading(false)
      setTimeLeft(null)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Compare APIs
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Measure up to 5 APIs side-by-side with identical settings.
          </p>
        </div>
        {results && (
          <Button
            variant="outline"
            onClick={() => setResults(null)}
            className="flex items-center gap-2"
          >
            <IconRotate className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {!results ? (
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>Comparison Settings</CardTitle>
            <CardDescription>
              Enter the URLs and configuration for your benchmark comparison.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* URLs Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Endpoints
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addUrl}
                  disabled={urls.length >= 5}
                  className="text-primary hover:text-primary hover:bg-primary/5"
                >
                  <IconPlus className="h-4 w-4 mr-1" />
                  Add API
                </Button>
              </div>
              <div className="space-y-3">
                {urls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <div
                      className={`flex-1 flex items-center border rounded-md bg-muted/20 focus-within:ring-1 focus-within:ring-primary overflow-hidden border-l-4 ${COLORS[index]}`}
                    >
                      <div className="px-3 text-xs font-bold text-muted-foreground bg-muted/30 h-full flex items-center border-r">
                        #{index + 1}
                      </div>
                      <Input
                        value={url}
                        onChange={(e) => updateUrl(index, e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                        className="border-0 bg-transparent h-10 focus-visible:ring-0 shadow-none"
                      />
                    </div>
                    {urls.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUrl(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <IconTrash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
              <Field>
                <FieldLabel>Shared Method</FieldLabel>
                <Select
                  value={method}
                  onValueChange={(val: any) => setMethod(val)}
                >
                  <SelectTrigger>
                    <SelectValue />
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
                <FieldLabel>Duration (s)</FieldLabel>
                <Input
                  type="number"
                  min={1}
                  max={300}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </Field>

              <Field>
                <FieldLabel>Connections</FieldLabel>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={connections}
                  onChange={(e) => setConnections(parseInt(e.target.value))}
                />
              </Field>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2 text-sm">
                <IconAlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Countdown */}
            {loading && timeLeft !== null && (
              <p className="text-sm text-muted-foreground mb-2">
                Time remaining: <span className="font-bold">{timeLeft}s</span>
              </p>
            )}

            {/* Run Button */}
            <Button
              onClick={handleRunCompare}
              disabled={loading}
              className="w-full h-12 text-base font-bold shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <IconRotate className="h-4 w-4 animate-spin" />
                  Running Sequential Tests...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IconPlayerPlay className="h-4 w-4 fill-current" />
                  Start Comparison
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Charts & Results */}
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-md overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex items-center gap-2 bg-background w-fit px-2 py-1 rounded border mb-2 text-xs font-bold text-primary">
                    <IconClock className="h-3 w-3" />
                    LATENCY (AVG)
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ComparisonChart
                    results={results}
                    metric="avgLatency"
                    title="Average Latency"
                    unit="ms"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex items-center gap-2 bg-background w-fit px-2 py-1 rounded border mb-2 text-xs font-bold text-blue-500">
                    <IconBolt className="h-3 w-3" />
                    THROUGHPUT (RPS)
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ComparisonChart
                    results={results}
                    metric="rps"
                    title="Requests Per Second"
                    unit="req/s"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex items-center gap-2 bg-background w-fit px-2 py-1 rounded border mb-2 text-xs font-bold text-destructive">
                    <IconChartBar className="h-3 w-3" />
                    TAIL LATENCY (P90)
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ComparisonChart
                    results={results}
                    metric="p90"
                    title="90th Percentile"
                    unit="ms"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex items-center gap-2 bg-background w-fit px-2 py-1 rounded border mb-2 text-xs font-bold text-green-500">
                    <IconPlus className="h-3 w-3" />
                    TOTAL REQUESTS
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ComparisonChart
                    results={results}
                    metric="totalRequests"
                    title="Total Requests Handled"
                    unit="reqs"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card className="shadow-xl border-t-4 border-t-primary overflow-hidden">
              <CardHeader className="bg-muted/10">
                <CardTitle>Detailed Comparison Table</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="text-left py-3 px-4 font-bold">API</th>
                        <th className="text-right py-3 px-4 font-bold">
                          Avg Latency
                        </th>
                        <th className="text-right py-3 px-4 font-bold">P90</th>
                        <th className="text-right py-3 px-4 font-bold">P99</th>
                        <th className="text-right py-3 px-4 font-bold">RPS</th>
                        <th className="text-right py-3 px-4 font-bold">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((res, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/10"
                        >
                          <td className="py-4 px-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${COLORS[
                                    index
                                  ].replace('border-', 'bg-')}`}
                                />
                                <span className="font-bold">
                                  API {index + 1}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground truncate max-w-[200px] mt-1">
                                {res.url}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-mono">
                            {res.latency?.average?.toFixed(1)} ms
                          </td>
                          <td className="py-4 px-4 text-right font-mono">
                            {res.latency.p90} ms
                          </td>
                          <td className="py-4 px-4 text-right font-mono">
                            {res.latency.p99} ms
                          </td>
                          <td className="py-4 px-4 text-right font-mono">
                            {res.requests?.average?.toFixed(1)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Badge
                              variant={
                                res.non2xx > 0 ? 'destructive' : 'outline'
                              }
                              className="text-[10px] px-1.5 h-5"
                            >
                              {res.non2xx} errors
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
