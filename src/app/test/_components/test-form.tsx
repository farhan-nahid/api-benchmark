"use client";

import {
  IconAlertCircle,
  IconBolt,
  IconCircleCheck,
  IconClock,
  IconPlayerPlay,
  IconRotate,
} from "@tabler/icons-react";
import { useState } from "react";
import { BenchmarkHeader } from "@/components/benchmark-header";
import { LatencyChart } from "@/components/charts/LatencyChart";
import { CommonSettings } from "@/components/common-settings";
import { MetricCard } from "@/components/metric-card";
import { PresetSelector } from "@/components/preset-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { runTestAction } from "@/lib/actions";
import { BENCHMARK_PRESETS, type HTTPMethod } from "@/lib/benchmark-types";
import { exportToCSV } from "@/lib/export";
import type { TestResult } from "@/lib/run-autocannon";

export function TestForm() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [method, setMethod] = useState<HTTPMethod>("GET");
  const [duration, setDuration] = useState(5);
  const [connections, setConnections] = useState(10);
  const [testType, setTestType] = useState("custom");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [headerName, setHeaderName] = useState("");
  const [headerValue, setHeaderValue] = useState("");

  const applyTestType = (typeId: string) => {
    setTestType(typeId);
    const type = BENCHMARK_PRESETS.find((t) => t.id === typeId);
    if (type) {
      setConnections(type.connections);
      setDuration(type.duration);
    }
  };

  const handleRunTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 0) return prev - 1;
        clearInterval(interval);
        return null;
      });
    }, 1000);

    try {
      const headers =
        headerName && headerValue ? { [headerName]: headerValue } : undefined;
      const data = await runTestAction({ url, method, duration, connections, headers });
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
      setTimeLeft(null);
    }
  };

  return (
    <div className="space-y-8">
      <BenchmarkHeader
        title="Single API Test"
        description="Benchmark a single endpoint with custom configuration."
        onExport={() => result && exportToCSV(result)}
        onReset={() => {
          setResult(null);
          setTestType("custom");
        }}
        isExportDisabled={!result}
      />

      {!result ? (
        <Card className="border-2 border-primary/5 shadow-xl">
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Configure the load test parameters below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <PresetSelector selectedTypeId={testType} onSelect={applyTestType} />

            <FieldGroup>
              <Field>
                <FieldLabel>API URL</FieldLabel>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com/v1/resource"
                  className="h-11 font-mono text-sm"
                />
              </Field>
            </FieldGroup>

            <CommonSettings
              method={method}
              setMethod={setMethod}
              duration={duration}
              setDuration={setDuration}
              connections={connections}
              setConnections={setConnections}
              headerName={headerName}
              setHeaderName={setHeaderName}
              headerValue={headerValue}
              setHeaderValue={setHeaderValue}
              isCustomizing={testType !== "custom"}
              onCustomize={() => setTestType("custom")}
            />

            {error && (
              <div className="fade-in slide-in-from-top-1 flex animate-in items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive text-sm">
                <IconAlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {loading && timeLeft !== null && (
              <p className="mb-2 text-muted-foreground text-sm">
                Time remaining: <span className="font-bold">{timeLeft}s</span>
              </p>
            )}

            <Button
              onClick={handleRunTest}
              disabled={loading}
              className="h-12 w-full font-bold text-base shadow-lg shadow-primary/20"
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
        <div className="fade-in animate-in space-y-8 duration-500">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              className={result.non2xx > 0 ? "border-destructive/50" : ""}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="shadow-md lg:col-span-2">
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
                      {(result.throughput.average / 1024 / 1024).toFixed(2)} MB/s
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Total Transferred</span>
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
  );
}
