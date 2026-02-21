"use client";

import { ComparisonChart } from "@/components/charts/ComparisonChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { compareTestsAction } from "@/lib/actions";
import { exportToCSV } from "@/lib/export";
import type { TestResult } from "@/lib/run-autocannon";
import {
    IconAlertCircle,
    IconBolt,
    IconChartLine,
    IconClock,
    IconDownload,
    IconFlame,
    IconPlayerPlay,
    IconPlus,
    IconRotate,
    IconServer,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

export function CompareForm() {
  const [urls, setUrls] = useState([
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/todos/1",
  ]);
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "PATCH">(
    "GET",
  );
  const [duration, setDuration] = useState(5);
  const [connections, setConnections] = useState(10);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [testType, setTestType] = useState("custom");
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
    if (results) {
      exportToCSV(results);
    }
  };

  const COLORS = [
    "border-primary",
    "border-blue-500",
    "border-green-500",
    "border-purple-500",
    "border-orange-500",
  ];

  const addUrl = () => {
    if (urls.length < 5) setUrls([...urls, ""]);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 2) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
    }
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleRunCompare = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    setTimeLeft(duration); // start countdown

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 0) return prev - 1;
        clearInterval(interval);
        return null;
      });
    }, 1000);

    try {
      const data = await compareTestsAction(urls, { method, duration, connections });
      setResults(data.apis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
      setTimeLeft(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl text-primary tracking-tight">Compare APIs</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Measure up to 5 APIs side-by-side with identical settings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
            disabled={!results}
          >
            <IconDownload className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setResults(null);
              setTestType("custom");
            }}
            className="flex items-center gap-2"
          >
            <IconRotate className="h-4 w-4" />
            Reset
          </Button>
        </div>
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
            {/* Quick Presets */}
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

            {/* URLs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
                  Endpoints
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addUrl}
                  disabled={urls.length >= 5}
                  className="text-primary hover:bg-primary/5 hover:text-primary"
                >
                  <IconPlus className="mr-1 h-4 w-4" />
                  Add API
                </Button>
              </div>
              <div className="space-y-3">
                {urls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <div
                      className={`flex flex-1 items-center overflow-hidden rounded-md border border-l-4 bg-muted/20 focus-within:ring-1 focus-within:ring-primary ${COLORS[index]}`}
                    >
                      <div className="flex h-full items-center border-r bg-muted/30 px-3 font-bold text-muted-foreground text-xs">
                        #{index + 1}
                      </div>
                      <Input
                        value={url}
                        onChange={(e) => updateUrl(index, e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                        className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
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
            <div className="grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-3">
              <Field>
                <div className="mb-2 flex items-end justify-between">
                  <FieldLabel className="mb-0">Shared Method</FieldLabel>
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
                <Select value={method} onValueChange={(val: any) => setMethod(val)}>
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
                  max={290}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                />
              </Field>

              <Field>
                <FieldLabel>Connections</FieldLabel>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={connections}
                  onChange={(e) => setConnections(parseInt(e.target.value, 10))}
                />
              </Field>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive text-sm">
                <IconAlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Countdown */}
            {loading && timeLeft !== null && (
              <p className="mb-2 text-muted-foreground text-sm">
                Time remaining: <span className="font-bold">{timeLeft}s</span>
              </p>
            )}

            {/* Run Button */}
            <Button
              onClick={handleRunCompare}
              disabled={loading}
              className="h-12 w-full font-bold text-base shadow-lg"
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
          <div className="fade-in animate-in space-y-10 duration-500">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden shadow-md">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="mb-2 flex w-fit items-center gap-2 rounded border bg-background px-2 py-1 font-bold text-primary text-xs">
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

              <Card className="overflow-hidden shadow-md">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="mb-2 flex w-fit items-center gap-2 rounded border bg-background px-2 py-1 font-bold text-blue-500 text-xs">
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

              <Card className="overflow-hidden shadow-md">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="mb-2 flex w-fit items-center gap-2 rounded border bg-background px-2 py-1 font-bold text-green-500 text-xs">
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
            <Card className="overflow-hidden border-t-4 border-t-primary shadow-xl">
              <CardHeader className="bg-muted/10">
                <CardTitle>Detailed Comparison Table</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="px-4 py-3 text-left font-bold">API</th>
                        <th className="px-4 py-3 text-right font-bold">Avg Latency</th>
                        <th className="px-4 py-3 text-right font-bold">P90</th>
                        <th className="px-4 py-3 text-right font-bold">P99</th>
                        <th className="px-4 py-3 text-right font-bold">RPS</th>
                        <th className="px-4 py-3 text-right font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((res, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/10"
                        >
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-3 w-3 rounded-full ${COLORS[
                                    index
                                  ].replace("border-", "bg-")}`}
                                />
                                <span className="font-bold">API {index + 1}</span>
                              </div>
                              <span className="mt-1 max-w-[200px] truncate text-muted-foreground text-xs">
                                {res.url}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right font-mono">
                            {res.latency?.average?.toFixed(1)} ms
                          </td>
                          <td className="px-4 py-4 text-right font-mono">
                            {res.latency.p90} ms
                          </td>
                          <td className="px-4 py-4 text-right font-mono">
                            {res.latency.p99} ms
                          </td>
                          <td className="px-4 py-4 text-right font-mono">
                            {res.requests?.average?.toFixed(1)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Badge
                              variant={res.non2xx > 0 ? "destructive" : "outline"}
                              className="h-5 px-1.5 text-[10px]"
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
  );
}
