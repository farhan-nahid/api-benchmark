"use client";

import {
  IconAlertCircle,
  IconBolt,
  IconChartLine,
  IconCircleCheck,
  IconClock,
  IconDownload,
  IconFlame,
  IconPlayerPlay,
  IconRotate,
  IconServer,
} from "@tabler/icons-react";
import { useState } from "react";
import { LatencyChart } from "@/components/charts/LatencyChart";
import { MetricCard } from "@/components/MetricCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportToCSV } from "@/lib/export";
import type { TestResult } from "@/lib/run-autocannon";

export default function TestPage() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "PATCH">(
    "GET",
  );
  const [duration, setDuration] = useState(5);
  const [connections, setConnections] = useState(10);
  const [testType, setTestType] = useState("custom");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const TEST_TYPES = [
    {
      id: "latency",
      name: "Latency Test",
      description: "Focus on response time stability",
      icon: <IconClock className="h-5 w-5" />,
      connections: 5,
      duration: 10,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: "load",
      name: "Load Test",
      description: "Standard heavy traffic simulation",
      icon: <IconServer className="h-5 w-5" />,
      connections: 25,
      duration: 30,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      id: "stress",
      name: "Stress Test",
      description: "Pushing the system to its breaking point",
      icon: <IconFlame className="h-5 w-5" />,
      connections: 50,
      duration: 60,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      id: "capacity",
      name: "Capacity Test",
      description: "Find maximum throughput peak",
      icon: <IconChartLine className="h-5 w-5" />,
      connections: 40,
      duration: 45,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const applyTestType = (typeId: string) => {
    setTestType(typeId);
    const type = TEST_TYPES.find((t) => t.id === typeId);
    if (type) {
      setConnections(type.connections);
      setDuration(type.duration);
    }
  };

  const handleExport = () => {
    if (result) {
      exportToCSV(result);
    }
  };

  const handleRunTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setTimeLeft(duration); // Start countdown

    // Countdown interval
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 0) return prev - 1;
        clearInterval(interval);
        return null;
      });
    }, 1000);

    try {
      const response = await fetch("/api/run-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, method, duration, connections }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to run test");
      }

      console.log("Test result:", data);

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
      setTimeLeft(null); // Reset countdown
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Single API Test</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Benchmark a single endpoint with custom configuration.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
            disabled={!result}
          >
            <IconDownload className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setTestType("custom");
            }}
            className="flex items-center gap-2"
          >
            <IconRotate className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {!result ? (
        <Card className="border-2 border-primary/5 shadow-xl">
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Configure the load test parameters below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
                Quick Presets
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {TEST_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => applyTestType(type.id)}
                    className={`group flex flex-col rounded-xl border-2 p-4 text-left transition-all ${
                      testType === type.id
                        ? `border-primary shadow-md ${type.bg}`
                        : "border-muted bg-background hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`mb-3 w-fit rounded-lg p-2 transition-colors ${
                        testType === type.id
                          ? "bg-primary text-primary-foreground"
                          : `${type.bg} ${type.color}`
                      }`}
                    >
                      {type.icon}
                    </div>
                    <div className="font-bold text-sm tracking-tight">{type.name}</div>
                    <div className="mt-1 line-clamp-1 text-[10px] text-muted-foreground">
                      {type.description}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px]">
                        {type.connections} conn
                      </div>
                      <div className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px]">
                        {type.duration}s
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <FieldGroup>
              <Field>
                <div className="mb-2 flex items-end justify-between">
                  <FieldLabel className="mb-0">API URL</FieldLabel>
                  {testType !== "custom" && (
                    <Button
                      variant="ghost"
                      type="button"
                      size="sm"
                      onClick={() => setTestType("custom")}
                      className="font-medium text-[10px] text-primary hover:underline"
                    >
                      Customize Settings
                    </Button>
                  )}
                </div>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com/v1/resource"
                  className="h-11 font-mono text-sm"
                />
              </Field>
            </FieldGroup>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Field>
                <FieldLabel>HTTP Method</FieldLabel>
                <Select value={method} onValueChange={(val: any) => setMethod(val)}>
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
                <FieldDescription>Max 300s for serverless stability.</FieldDescription>
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
                <FieldDescription>Concurrent requests (max 50).</FieldDescription>
              </Field>
            </div>

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
          {/* Results Summary */}
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
